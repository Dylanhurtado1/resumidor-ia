import { useState } from 'react';
import { Mic, Volume2, Sparkles, FileText, Loader2, Brain } from 'lucide-react';

function App() {
  const [input, setInput] = useState('');
  const [claro, setClaro] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEntender = async () => {
    setLoading(true);
    setClaro('');
    try {
      const resp = await fetch('http://localhost:8080/api/entender', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto: input })
      });
      const data = await resp.json();
      setClaro(data.claro || 'Sin respuesta.');
    } catch(e) {
      console.error(e);
      setClaro('Hubo un error procesando tu texto.');
    }
    setLoading(false);
  };

  function handleDictado() {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Tu navegador no soporta dictado por voz.');
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'es-AR';
    recognition.continuous = false;
    recognition.interimResults = false;
  
    recognition.onresult = function(event) {
      const result = event.results[0][0].transcript;
      setInput(result);
    };
    recognition.onerror = function(event) {
      alert('Error de reconocimiento de voz: ' + event.error);
    };
    recognition.start();
  }

  function leerTexto() {
    if (!claro) return;
    window.speechSynthesis.speak(
      new window.SpeechSynthesisUtterance(claro)
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl mb-6 shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Entiendo
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transforma textos complejos y burocráticos en explicaciones claras y fáciles de entender
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 hover:shadow-3xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Texto original</h2>
              </div>
              
              <textarea 
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Pega o escribe el texto que quieras entender... 📝"
                className="w-full h-48 p-6 border-2 border-gray-200 rounded-2xl resize-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 text-gray-700 placeholder-gray-400 bg-gray-50/50 hover:bg-white"
              />
              
              <div className="flex flex-wrap gap-3 mt-6">
                <button 
                  onClick={handleDictado}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium"
                >
                  <Mic className="w-4 h-4" />
                  Dictar
                </button>
                
                <button
                  onClick={() => setInput("Estimado beneficiario, le informamos que debe regularizar su situación fiscal para evitar la suspensión de su pensión. Para más información, comuníquese con nuestro centro de atención o visite la página web oficial.")}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-100 to-indigo-100 hover:from-purple-200 hover:to-indigo-200 text-purple-700 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium"
                >
                  <Sparkles className="w-4 h-4" />
                  Texto de ejemplo
                </button>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={handleEntender}
              disabled={loading || !input.trim()}
              className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 hover:from-indigo-700 hover:via-purple-700 hover:to-cyan-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold py-6 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-2xl hover:shadow-3xl text-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Analizando y simplificando...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-3">
                  <Brain className="w-6 h-6" />
                  Simplificar texto
                </span>
              )}
            </button>
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            {claro ? (
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl shadow-2xl border border-emerald-200/50 p-8 hover:shadow-3xl transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-xl font-semibold text-emerald-800">Versión simplificada</h2>
                  </div>
                  <button
                    onClick={leerTexto}
                    className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-100 to-teal-100 hover:from-emerald-200 hover:to-teal-200 text-emerald-700 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium"
                  >
                    <Volume2 className="w-4 h-4" />
                    Escuchar
                  </button>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-emerald-200/30 shadow-inner">
                  <p className="text-gray-700 leading-relaxed text-lg">{claro}</p>
                </div>
                
                <div className="mt-4 p-4 bg-emerald-100/50 rounded-xl">
                  <p className="text-emerald-700 text-sm font-medium">
                    ✨ Texto simplificado exitosamente
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white/60 backdrop-blur-sm rounded-3xl border-2 border-dashed border-gray-300 p-12 text-center hover:bg-white/80 transition-all duration-300">
                <div className="w-20 h-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Brain className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-500 mb-3">
                  Esperando texto para simplificar
                </h3>
                <p className="text-gray-400 text-lg">
                  Ingresa un texto complejo y presiona "Simplificar texto" para ver la versión clara aquí
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/80 transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Mic className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Dictado por voz</h3>
            <p className="text-gray-600 text-sm">Habla y convierte tu voz en texto automáticamente</p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/80 transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">IA Inteligente</h3>
            <p className="text-gray-600 text-sm">Simplifica textos complejos usando inteligencia artificial</p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/80 transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Volume2 className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Síntesis de voz</h3>
            <p className="text-gray-600 text-sm">Escucha el texto simplificado con voz natural</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-gray-200/50">
          <p className="text-gray-500 text-lg">
            Hecho con ❤️ para hacer la información más accesible para todos
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
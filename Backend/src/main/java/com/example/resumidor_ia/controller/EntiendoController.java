package com.example.resumidor_ia.controller;

import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class EntiendoController {

    @PostMapping("/entender")
    public Map<String, String> entender(@RequestBody Map<String, String> body) {
        String texto = body.get("texto");
        String claro = "Te lo explico fácil: " + (texto != null ? simplificar(texto) : "No se entendió el texto.");
        return Map.of("claro", claro);
    }

    // Ejemplo simple de simulación de ayuda
    private String simplificar(String texto) {
        return texto
                .replaceAll("\\b(palabra técnica|compleja|críptica)\\b", "algo más simple")
                .replaceAll("[\\.;:,]", ".")
                .replaceAll("\\s+", " ")
                .trim();
    }


}

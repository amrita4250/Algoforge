package com.dsatutor.controller;

import com.dsatutor.service.GeminiService;
import com.dsatutor.service.StorageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class AppController {

    private final GeminiService gemini;
    private final StorageService storage;

    @Value("${gemini.api.key:}")
    private String configuredApiKey;

    @Value("${gemini.api.key2:}")
    private String configuredApiKey2;

    public AppController(GeminiService gemini, StorageService storage) {
        this.gemini = gemini;
        this.storage = storage;
    }

    private String resolveApiKey() {
        String key = storage.getApiKey();
        if (key == null || key.isBlank()) key = configuredApiKey;
        return key;
    }

    @PostMapping("/chat")
    public Map<String, String> chat(@RequestBody ChatRequest req) {
        String apiKey = resolveApiKey();
        String systemPrompt = "onboarding".equals(req.mode())
            ? GeminiService.ONBOARDING_PROMPT
            : GeminiService.TUTOR_PROMPT;

        String reply = gemini.chat(apiKey, configuredApiKey2, systemPrompt,
            req.history() != null ? req.history() : "", req.message());
        return Map.of("reply", reply);
    }

    @PostMapping("/validate-key")
    public Map<String, Object> validateKey(@RequestBody Map<String, String> body) {
        String key = body.get("apiKey");
        if (key == null || key.isBlank()) return Map.of("valid", false, "error", "Empty key");

        String test = gemini.chat(key, "Reply with just: ok", "", "ping");
        if ("__BAD_KEY__".equals(test)) return Map.of("valid", false, "error", "Invalid API key");
        if ("__NO_KEY__".equals(test))  return Map.of("valid", false, "error", "No key provided");

        return Map.of("valid", true);
    }

    @GetMapping("/data")
    public String getData() {
        String data = storage.load();
        return data != null ? data : "{}";
    }

    @PostMapping("/data")
    public Map<String, String> saveData(@RequestBody String json) {
        storage.save(json);
        return Map.of("status", "ok");
    }

    record ChatRequest(String message, String history, String mode) {}
}

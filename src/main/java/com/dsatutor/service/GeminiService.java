package com.dsatutor.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import java.net.URI;
import java.net.http.*;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.cert.X509Certificate;

@Service
public class GeminiService {

    private static final Logger log = LoggerFactory.getLogger(GeminiService.class);

    private static final String API_BASE =
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
    private static final String API_BASE_2 =
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

    private static final HttpClient CLIENT = buildHttpClient();

    private static HttpClient buildHttpClient() {
        try {
            SSLContext sc = SSLContext.getInstance("TLS");
            sc.init(null, new TrustManager[]{new X509TrustManager() {
                public void checkClientTrusted(X509Certificate[] c, String a) {}
                public void checkServerTrusted(X509Certificate[] c, String a) {}
                public X509Certificate[] getAcceptedIssuers() { return new X509Certificate[0]; }
            }}, new java.security.SecureRandom());
            return HttpClient.newBuilder().sslContext(sc).build();
        } catch (Exception e) {
            return HttpClient.newHttpClient();
        }
    }

    public static final String TUTOR_PROMPT =
        "You are a DSA tutor helping a Java developer prepare for coding interviews.\n" +
        "Rules:\n" +
        "- Hints only, never full solutions unless user says show full code.\n" +
        "- Short replies (2-5 lines). User is tired from office work.\n" +
        "- Java-specific tips. Encouraging tone.\n" +
        "- If asked about approach: validate or gently redirect.\n";

    public static final String ONBOARDING_PROMPT =
        "You are a friendly DSA learning assistant doing a casual onboarding chat.\n" +
        "Goal: understand the user level and recommend a starting phase (1-4).\n\n" +
        "Phases:\n" +
        "Phase 1 - Foundation: Arrays, Strings, Two Pointers, Sliding Window, Binary Search\n" +
        "Phase 2 - Linear: Linked Lists, Stacks, Queues, Hashing\n" +
        "Phase 3 - Non-Linear: Binary Trees, BST, Graphs, Recursion/Backtracking\n" +
        "Phase 4 - Advanced: Dynamic Programming, Greedy, Heaps, Bit Manipulation\n\n" +
        "Instructions:\n" +
        "- Chat naturally and casually. 2-4 lines max per reply.\n" +
        "- Ask 3-4 short questions about Java + DSA comfort level.\n" +
        "- When confident, end your message with: [PHASE:X] on its own line.\n" +
        "- Only include [PHASE:X] once you are sure.\n";

    public String chat(String apiKey, String fallbackKey, String systemPrompt, String history, String userMessage) {
        if (apiKey == null || apiKey.isBlank()) return "__NO_KEY__";

        String result = callGemini(apiKey.trim(), systemPrompt, history, userMessage);

        if ((result.startsWith("[API Error]") || result.startsWith("Error:"))
                && fallbackKey != null && !fallbackKey.isBlank()) {
            log.warn("Primary key failed ({}), trying fallback key", result);
            String fallback = callGemini(fallbackKey.trim(), API_BASE_2, systemPrompt, history, userMessage);
            if (!fallback.startsWith("[API Error]") && !fallback.startsWith("Error:")) return fallback;
        }
        return result;
    }

    public String chat(String apiKey, String systemPrompt, String history, String userMessage) {
        return chat(apiKey, null, systemPrompt, history, userMessage);
    }

    private String callGemini(String key, String systemPrompt, String history, String userMessage) {
        return callGemini(key, API_BASE, systemPrompt, history, userMessage);
    }

    private String callGemini(String key, String baseUrl, String systemPrompt, String history, String userMessage) {
        String combined = systemPrompt + "\n\n";
        if (history != null && !history.isBlank()) combined += history + "\nUser: ";
        combined += userMessage;

        String body = "{\"contents\":[{\"parts\":[{\"text\":\"" + escape(combined) + "\"}]}]}";

        try {
            String url = baseUrl + "?key=" + URLEncoder.encode(key, StandardCharsets.UTF_8);
            HttpRequest req = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(body))
                .build();

            HttpResponse<String> resp = CLIENT.send(req, HttpResponse.BodyHandlers.ofString());
            log.info("Gemini status: {}", resp.statusCode());
            if (resp.statusCode() == 429) return "[API Error] Quota exceeded";
            if (resp.statusCode() != 200) return "[API Error] HTTP " + resp.statusCode();
            return extractText(resp.body());
        } catch (Exception e) {
            log.error("Gemini request failed", e);
            return "Error: " + e.getMessage();
        }
    }

    private String extractText(String json) {
        int idx = json.indexOf("\"text\":");
        if (idx != -1) {
            int start = json.indexOf('"', idx + 7) + 1;
            int end = findEnd(json, start);
            return unescape(json.substring(start, end));
        }
        int msgIdx = json.indexOf("\"message\":");
        if (msgIdx != -1) {
            int start = json.indexOf('"', msgIdx + 10) + 1;
            int end = findEnd(json, start);
            return "[API Error] " + json.substring(start, end);
        }
        return "[No response] Raw: " + json;
    }

    private int findEnd(String s, int i) {
        for (; i < s.length(); i++) {
            if (s.charAt(i) == '\\') { i++; continue; }
            if (s.charAt(i) == '"') return i;
        }
        return s.length();
    }

    private String escape(String s) {
        return s.replace("\\", "\\\\").replace("\"", "\\\"")
                .replace("\n", "\n").replace("\r", "\r").replace("\t", "\t");
    }

    private String unescape(String s) {
        return s.replace("\n", "\n").replace("\t", "\t")
                .replace("\\\"", "\"").replace("\\\\", "\\");
    }
}

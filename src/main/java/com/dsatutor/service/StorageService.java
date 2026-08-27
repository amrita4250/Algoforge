package com.dsatutor.service;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.file.*;

@Service
public class StorageService {

    private static final Gson GSON = new GsonBuilder().setPrettyPrinting().create();
    private final Path dataFile;

    public StorageService() {
        Path dir = Paths.get(System.getProperty("user.home"), ".dsatutor");
        try { Files.createDirectories(dir); } catch (IOException ignored) {}
        dataFile = dir.resolve("app_data.json");
    }

    public String load() {
        if (!Files.exists(dataFile)) return null;
        try {
            return Files.readString(dataFile);
        } catch (IOException e) {
            return null;
        }
    }

    public void save(String json) {
        try {
            Files.writeString(dataFile, json);
        } catch (IOException ignored) {}
    }

    public String getApiKey() {
        String raw = load();
        if (raw == null) return "";
        try {
            var obj = GSON.fromJson(raw, java.util.Map.class);
            var meta = (java.util.Map<?,?>) obj.get("userMeta");
            if (meta != null) {
                Object key = meta.get("geminiApiKey");
                return key != null ? key.toString() : "";
            }
        } catch (Exception ignored) {}
        return "";
    }
}

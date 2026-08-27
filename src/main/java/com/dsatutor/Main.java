package com.dsatutor;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;

import java.awt.Desktop;
import java.net.URI;

@SpringBootApplication
public class Main {

    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }

    @Bean
    public ApplicationRunner openBrowser() {
        return args -> {
            try {
                Thread.sleep(1200);
                if (Desktop.isDesktopSupported()) {
                    Desktop.getDesktop().browse(URI.create("http://localhost:8080"));
                }
            } catch (Exception ignored) {}
        };
    }
}

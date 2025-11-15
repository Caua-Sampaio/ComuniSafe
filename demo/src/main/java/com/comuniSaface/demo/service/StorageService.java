package com.comuniSaface.demo.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class StorageService {
    public String saveFile(MultipartFile file) throws IOException {
        String nome = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path path = Paths.get("uploads/" + nome);
        Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
        return nome;
    }
}

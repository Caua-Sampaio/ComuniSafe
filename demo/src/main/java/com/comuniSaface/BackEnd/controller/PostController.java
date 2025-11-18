package com.comuniSaface.BackEnd.controller;

import com.comuniSaface.BackEnd.dto.PostDTO;
import com.comuniSaface.BackEnd.service.PostService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.util.Map;
import java.net.URI;

@RestController
@RequestMapping(value = "/post")
@CrossOrigin(origins = "*")
public class PostController {
    @Autowired
    private PostService postService;
    @Autowired
    private ObjectMapper objectMapper;

    @GetMapping(value = "/allPosts", produces = "application/json")
    public ResponseEntity<Page<PostDTO>> findAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "2") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<PostDTO> result = postService.findAll(pageable);
        return ResponseEntity.ok(result);
    }
    @PutMapping("/myPosts/{usuarioId}")
    public ResponseEntity<Page<PostDTO>> findByUser(@PathVariable Long usuarioId, Pageable pageable){
        Page<PostDTO> page = postService.findByUser(usuarioId, pageable);
        return ResponseEntity.ok(page);
    }
    @PostMapping(value = "/inserir", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PostDTO> insert(
            @RequestPart("postArray") String postJson,                                // receber como String para maior compatibilidade
            @RequestPart(value = "midia", required = false) MultipartFile midia
    ) throws IOException {
        // desserializa o JSON para PostDTO
        PostDTO dto = objectMapper.readValue(postJson, PostDTO.class);
        dto = postService.insert(dto, midia);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(dto.getId()).toUri();
        return ResponseEntity.created(uri).body(dto);
    }
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PostDTO> update(
            @PathVariable Long id,
            @RequestPart("post") String postJson,
            @RequestPart(value = "midia", required = false) MultipartFile midia
    ) throws IOException {
        PostDTO dto = objectMapper.readValue(postJson, PostDTO.class);
        dto = postService.update(id, dto, midia);
        return ResponseEntity.ok(dto);
    }
    @DeleteMapping("/{postId}/usuario/{usuarioId}")
    public ResponseEntity<Map<String, Object>> deletarPost(
            @PathVariable Long postId, @PathVariable Long usuarioId) {
        postService.deletarPorId(postId, usuarioId);
        return ResponseEntity.ok(Map.of(
                "mensagem", "Publicação marcada como deletada com sucesso",
                "postId", postId
        ));
    }
}
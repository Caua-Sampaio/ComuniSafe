package com.comuniSaface.demo.controller;

import com.comuniSaface.demo.dto.PostDTO;
import com.comuniSaface.demo.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.Map;
import java.net.URI;

@RestController
@RequestMapping(value = "/post")
public class PostController {


    @Autowired
    private PostService postService;

    @GetMapping
    public ResponseEntity<Page<PostDTO>> findAll(Pageable pageable){
        Page<PostDTO> page = postService.findAll(pageable);
        return ResponseEntity.ok(page);
    }

    @PostMapping("/inserir")
    public ResponseEntity<PostDTO> insert(@RequestBody PostDTO dto){
        dto = postService.insert(dto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(dto.getId()).toUri();
        return ResponseEntity.created(uri).body(dto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PostDTO> update (@PathVariable Long id, @RequestBody PostDTO dto){
        dto = postService.update(id, dto);
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

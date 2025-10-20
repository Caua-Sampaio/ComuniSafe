package com.comuniSaface.demo.controller;

import com.comuniSaface.demo.dto.PostDTO;
import com.comuniSaface.demo.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

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

    @PostMapping
    public ResponseEntity<PostDTO> insert(@RequestBody PostDTO dto){
        dto = postService.insert(dto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(dto.getId()).toUri();
        return ResponseEntity.created(uri).body(dto);
    }

    @DeleteMapping("/{postId}/usuario/{usuarioId}")
    public ResponseEntity<Void> deleteById(@PathVariable Long postId, @PathVariable Long usuarioId){
        postService.deleteById(postId, usuarioId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/titulo/{assunto}/usuario/{usuarioId}")
    public ResponseEntity<Void> deleteByTitle(@PathVariable String assunto, @PathVariable Long usuarioId){
        postService.deleteByTitle(assunto, usuarioId);
        return ResponseEntity.noContent().build();
    }
}

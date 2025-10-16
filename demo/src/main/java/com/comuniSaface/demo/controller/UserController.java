package com.comuniSaface.demo.controller;

import com.comuniSaface.demo.dto.UserDTO;
import com.comuniSaface.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping(value = "/user")
public class UserController {

    @Autowired
    private UserService userService;


    @PostMapping
    public ResponseEntity<UserDTO> insert (@RequestBody UserDTO dto){
        dto = userService.insert(dto);
        //Link para o recurso criado
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(dto.getId()).toUri();
        //Voltar a response 201 - CREATED
        return ResponseEntity.created(uri).body(dto);
    }

}

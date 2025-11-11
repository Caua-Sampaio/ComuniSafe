
package com.comuniSaface.demo.controller;

import com.comuniSaface.demo.dto.UserDTO;
import com.comuniSaface.demo.dto.UserMinDTO;
import com.comuniSaface.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Map;

@RestController
@RequestMapping(value = "/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<Page<UserDTO>> findAll(Pageable pageable){
        Page<UserDTO> dto = userService.findAll(pageable);
        return ResponseEntity.ok(dto);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<UserDTO> findById(@PathVariable Long id){
        UserDTO dto = userService.findById(id);
        return ResponseEntity.ok(dto);
    }


    @PostMapping(value = "/cadastrar")
    public ResponseEntity<UserDTO> insert (@RequestBody UserDTO dto){
        dto = userService.insert(dto);
        //Link para o recurso criado
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(dto.getId()).toUri();
        //Voltar a response 201 - CREATED
        return ResponseEntity.created(uri).body(dto);
    }

    @PostMapping(value = "/login")
    public ResponseEntity<Map<String, Boolean>> login (@RequestBody UserMinDTO minDTO){
        boolean success = userService.login(minDTO);
        return ResponseEntity.ok(Map.of("success", success));
    }
}

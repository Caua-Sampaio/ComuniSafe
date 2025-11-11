
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
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping(value = "/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<Page<UserDTO>> findAll(Pageable pageable){
        Page<UserDTO> dto = userService.findAll(pageable);
        dto.forEach(u -> u.setSenha(null));
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
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(dto.getId()).toUri();
        return ResponseEntity.created(uri).body(dto);
    }

    @PostMapping(value = "/login")
    public ResponseEntity<Map<String, Boolean>> login (@RequestBody UserMinDTO minDTO, HttpSession session){
        boolean success = userService.login(minDTO);
        if (success) {
            UserDTO userDTO = userService.findByEmail(minDTO.email());
            session.setAttribute("user", userDTO);
        }

        return ResponseEntity.ok(Map.of("success", success));
    }

    @GetMapping("/me")
    public ResponseEntity<UserDTO> me(HttpSession session){
        UserDTO user = (UserDTO) session.getAttribute("user");
        if (user == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(user);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpSession session){
        session.invalidate();
        return ResponseEntity.noContent().build();
    }
}

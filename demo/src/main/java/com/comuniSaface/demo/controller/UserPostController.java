package com.comuniSaface.demo.controller;

import com.comuniSaface.demo.dto.PostDTO;
import com.comuniSaface.demo.dto.UserDTO;
import com.comuniSaface.demo.service.UserPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api")
public class UserPostController {

    private final UserPostService userPostService;

    @Autowired
    public UserPostController(UserPostService userPostService) {
        this.userPostService = userPostService;
    }
    @GetMapping("/me/posts")
    public ResponseEntity<Page<PostDTO>> myPosts(HttpSession session, Pageable pageable) {
        Object obj = session.getAttribute("user");
        if (obj == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        if (!(obj instanceof UserDTO)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        UserDTO user = (UserDTO) obj;
        Page<PostDTO> page = userPostService.findPostsByUsuario(user.getId(), pageable);
        return ResponseEntity.ok(page);
    }
}
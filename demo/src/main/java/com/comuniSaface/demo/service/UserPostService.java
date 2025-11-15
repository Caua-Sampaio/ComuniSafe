package com.comuniSaface.demo.service;

import com.comuniSaface.demo.dto.PostDTO;
import com.comuniSaface.demo.entities.PostEntity;
import com.comuniSaface.demo.repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
public class UserPostService {

    private final PostRepository postRepository;

    @Autowired
    public UserPostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public Page<PostDTO> findPostsByUsuario(Long usuarioId, Pageable pageable) {
        Page<PostEntity> page = postRepository.findByUsuarioIdAndDeletadoFalse(usuarioId, pageable);
        return page.map(this::toDTO);
    }

    private PostDTO toDTO(PostEntity entity) {
        PostDTO dto = new PostDTO();
        dto.setId(entity.getId());
        dto.setBairro(entity.getBairro());
        dto.setCidade(entity.getCidade());
        dto.setMoment(entity.getMoment());
        dto.setAssunto(entity.getAssunto());
        dto.setDescricao(entity.getDescricao());
        dto.setMidia(Arrays.toString(entity.getMidia()).getBytes());
        if (entity.getUsuario() != null) {
            dto.setUsuarioId(entity.getUsuario().getId());
        }
        dto.setDeletado(entity.isDeletado());
        dto.setDataDelecao(entity.getDataDelecao());
        return dto;
    }
}


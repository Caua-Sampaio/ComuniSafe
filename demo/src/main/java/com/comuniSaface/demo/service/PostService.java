package com.comuniSaface.demo.service;

import com.comuniSaface.demo.dto.PostDTO;
import com.comuniSaface.demo.entities.PostEntity;
import com.comuniSaface.demo.entities.UserEntity;
import com.comuniSaface.demo.repositories.PostRepository;
import com.comuniSaface.demo.repositories.UserRepository;
import com.comuniSaface.demo.service.exceptions.ResourceNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

@Service
public class    PostService {

    private static final Logger logger = LoggerFactory.getLogger(PostService.class);

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional(readOnly = true)
    public Page<PostDTO> findAll(Pageable pageable){
        Page<PostEntity> result = postRepository.findAllByDeletadoFalse(pageable);
        return result.map(PostDTO::new);
    }

    @Transactional
    public PostDTO insert(PostDTO dto){
        PostEntity entity = new PostEntity();
        copyDtoToEntity(dto, entity);
        entity = postRepository.save(entity);
        return new PostDTO(entity);
    }

    @Transactional
    public PostDTO update(Long id, PostDTO dto){
        try {
            PostEntity entity = postRepository.getReferenceById(id);
            copyDtoToEntity(dto, entity);
            entity = postRepository.save(entity);
            return new PostDTO(entity);
        } catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Post não encontrado: " + id);
        }
    }

    @Transactional
    public void deletarPorId(Long postId, Long usuarioId){
        PostEntity entity = postRepository.findByIdAndDeletadoFalse(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Publicação não encontrado"));

        if (!entity.getUsuario().getId().equals(usuarioId)) {
            throw new IllegalArgumentException("Você não tem permissão para deletar esta publicação");
        }

        entity.setDeletado(true);
        entity.setDataDelecao(Instant.now());
        postRepository.save(entity);

        logger.info("Publicação marcada como deletada. postId={}, usuarioId={}", postId, usuarioId);
    }

    private void copyDtoToEntity(PostDTO dto, PostEntity entity){
        entity.setAssunto(dto.getAssunto());
        entity.setMidia(dto.getMidia());
        entity.setBairro(dto.getBairro());
        entity.setCidade(dto.getCidade());
        entity.setMoment(dto.getMoment());
        entity.setDescricao(dto.getDescricao());

        if(dto.getUsuarioId() != null){
            UserEntity user = userRepository.getReferenceById(dto.getUsuarioId());
            entity.setUsuario(user);
        }
    }
}




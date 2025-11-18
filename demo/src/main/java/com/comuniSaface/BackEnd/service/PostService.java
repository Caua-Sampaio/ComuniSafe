package com.comuniSaface.BackEnd.service;

import com.comuniSaface.BackEnd.dto.PostDTO;
import com.comuniSaface.BackEnd.entities.PostEntity;
import com.comuniSaface.BackEnd.entities.UserEntity;
import com.comuniSaface.BackEnd.repositories.PostRepository;
import com.comuniSaface.BackEnd.repositories.UserRepository;
import com.comuniSaface.BackEnd.service.exceptions.ResourceNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.Instant;

@Service
public class    PostService {

    private static final Logger logger = LoggerFactory.getLogger(PostService.class);

    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserRepository userRepository;



    public Page<PostDTO> findAll(Pageable pageable) {
        Pageable sortedPageable = PageRequest.of(
                pageable.getPageNumber(),
                pageable.getPageSize(),
                Sort.by("id").descending()
        );
        Page<PostEntity> page = postRepository.findAll(sortedPageable);
        return page.map(PostDTO::new);
    }

    @Transactional(readOnly = true)
    public Page<PostDTO> findByUser(Long usuarioId, Pageable pageable){
        Page<PostEntity> result = postRepository.findByUser(usuarioId, pageable);
        return result.map(PostDTO::new);
    }

    @Transactional
    public PostDTO insert(PostDTO dto, MultipartFile midiaFile) throws IOException {
        PostEntity entity = new PostEntity();
        copyDtoToEntity(dto, entity, midiaFile);
        entity = postRepository.save(entity);
        return new PostDTO(entity);
    }

    @Transactional
    public PostDTO update(Long id, PostDTO dto, MultipartFile midiaFile) throws IOException{
        try {
            PostEntity entity = postRepository.getReferenceById(id);
            copyDtoToEntity(dto, entity, midiaFile);
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

    private void copyDtoToEntity(PostDTO dto, PostEntity entity, MultipartFile midia) throws IOException {
        entity.setAssunto(dto.getAssunto());
        entity.setBairro(dto.getBairro());
        entity.setCidade(dto.getCidade());
        entity.setMoment(dto.getMoment());
        entity.setDescricao(dto.getDescricao());
        entity.setDeletado(dto.getDeletado() != null && dto.getDeletado());
        if(dto.getUsuarioId() != null){
            UserEntity user = userRepository.getReferenceById(dto.getUsuarioId());
            entity.setUsuario(user);
        }
        if (midia != null && !midia.isEmpty()) {
            byte[] bytes = midia.getBytes();
            entity.setMidia(midia.getBytes());
        }
    }
}
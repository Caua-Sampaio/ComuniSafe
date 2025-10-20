package com.comuniSaface.demo.service;

import com.comuniSaface.demo.dto.PostDTO;
import com.comuniSaface.demo.entities.PostEntity;
import com.comuniSaface.demo.entities.UserEntity;
import com.comuniSaface.demo.repositories.PostRepository;
import com.comuniSaface.demo.repositories.UserRepository;
import com.comuniSaface.demo.service.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PostService {
    private final PostRepository postRepository;

    private final UserRepository userRepository;

    public PostService(PostRepository postRepository, UserRepository userRepository){
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }


    @Transactional(readOnly = true)
    public Page<PostDTO> findAll(Pageable pageable){
        Page<PostEntity> result = postRepository.findAll(pageable);
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
    public void deleteById(Long postId, Long usuarioId){
        PostEntity entity = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post não encontrado"));

        if(!entity.getUsuario().getId().equals(usuarioId)){
            throw new IllegalArgumentException("Você não tem poermissão para deletar este post");
        }
        postRepository.delete(entity);
    }

    @Transactional
    public void deleteByTitle(String assunto, Long usuarioId){
        PostEntity entity = postRepository.findByAssuntoAndUsuarioId(assunto, usuarioId)
                .orElseThrow(() -> new ResourceNotFoundException("Post não encontrado com o título: " + assunto));
        postRepository.delete(entity);
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



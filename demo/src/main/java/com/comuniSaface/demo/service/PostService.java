package com.comuniSaface.demo.service;

import com.comuniSaface.demo.dto.PostDTO;
import com.comuniSaface.demo.entities.PostEntity;
import com.comuniSaface.demo.repositories.PostRepository;
import com.comuniSaface.demo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public PostDTO insert(PostDTO dto){
        PostEntity entity = new PostEntity();
        copyDtoToEntity(dto, entity);
        entity = postRepository.save(entity);
        return new PostDTO(entity);
    }

    private void copyDtoToEntity(PostDTO dto, PostEntity entity){
        entity.setAssunto(dto.getAssunto());
        entity.setMidia(dto.getMidia());
        entity.setBairro(dto.getBairro());
        entity.setCidade(dto.getCidade());
        entity.setMoment(dto.getMoment());
        entity.setDescricao(dto.getDescricao());

        if(dto.getUsuarioId() != null){
            var usuario = userRepository.getReferenceById(dto.getUsuarioId());
            entity.setUsuario(usuario);
        }else{
            entity.setUsuario(null);
        }
    }
}



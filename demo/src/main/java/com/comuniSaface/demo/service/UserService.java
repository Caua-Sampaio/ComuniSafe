package com.comuniSaface.demo.service;

import com.comuniSaface.demo.dto.PostDTO;
import com.comuniSaface.demo.dto.UserDTO;
import com.comuniSaface.demo.entities.PostEntity;
import com.comuniSaface.demo.entities.UserEntity;
import com.comuniSaface.demo.repositories.PostRepository;
import com.comuniSaface.demo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {


    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserRepository userRepository;


    @Transactional
    public UserDTO insert(UserDTO dto){
        UserEntity entity = new UserEntity();
        copyDtoToEntity(dto, entity);
        entity = userRepository.save(entity);
        return new UserDTO(entity);
    }

    private void copyDtoToEntity(UserDTO dto, UserEntity entity){
        entity.setNome(dto.getNome());
        entity.setSenha(dto.getSenha());
        entity.setCidade(dto.getCidade());
        entity.setBairro(dto.getBairro());

        entity.getPosts().clear();
        for (PostDTO postDTO : dto.getPosts()) {
            PostEntity postEntity = new PostEntity();
            postEntity.setAssunto(postDTO.getAssunto());
            postEntity.setMidia(postDTO.getMidia());
            postEntity.setBairro(postDTO.getBairro());
            postEntity.setCidade(postDTO.getCidade());
            postEntity.setMoment(postDTO.getMoment());
            postEntity.setDescricao(postDTO.getDescricao());

            postEntity.setUsuario(entity);

            entity.getPosts().add(postEntity);
        }
    }
}

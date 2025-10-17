package com.comuniSaface.demo.service;

import com.comuniSaface.demo.dto.PostDTO;
import com.comuniSaface.demo.dto.UserDTO;
import com.comuniSaface.demo.entities.PostEntity;
import com.comuniSaface.demo.entities.UserEntity;
import com.comuniSaface.demo.repositories.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public Page<UserDTO> findAll(Pageable pageable){
        Page<UserEntity> result = userRepository.findAll(pageable);
        return result.map(UserDTO::new);
    }


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
    }
}

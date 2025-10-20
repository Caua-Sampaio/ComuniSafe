package com.comuniSaface.demo.service;

import com.comuniSaface.demo.dto.PostDTO;
import com.comuniSaface.demo.dto.UserDTO;
import com.comuniSaface.demo.entities.PostEntity;
import com.comuniSaface.demo.entities.UserEntity;
import com.comuniSaface.demo.repositories.UserRepository;
import com.comuniSaface.demo.service.exceptions.ResourceNotFoundException;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.text.html.Option;
import java.util.Optional;

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

    @Transactional(readOnly = true)
    public UserDTO findById(Long id){
        Optional<UserEntity> result = userRepository.findById(id);
        UserEntity entity = result.orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado " + id));
        return new UserDTO(entity);
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

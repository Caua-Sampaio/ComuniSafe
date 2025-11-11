package com.comuniSaface.demo.service;

import com.comuniSaface.demo.dto.UserDTO;
import com.comuniSaface.demo.dto.UserMinDTO;
import com.comuniSaface.demo.entities.UserEntity;
import com.comuniSaface.demo.repositories.UserRepository;
import com.comuniSaface.demo.service.exceptions.BadCredentialsException;
import com.comuniSaface.demo.service.exceptions.ResourceNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public boolean login (UserMinDTO minDTO){
        UserMinDTO user = Optional.ofNullable(userRepository.searchByEmail(minDTO.email()))
                .orElseThrow(() -> new ResourceNotFoundException("Email não encontrado"));
        if(!user.senha().equals(minDTO.senha())){
            throw new BadCredentialsException("Senha incorreta !");
        }
        return true;
    }

    @Transactional
    public UserDTO insert(UserDTO dto){
        UserEntity entity = new UserEntity();
        String validateUser = userRepository.existsByEmail(dto.getEmail());
        if(validateUser != null){
            throw new IllegalArgumentException("Usuário já existe com este email");
        }
        copyDtoToEntity(dto, entity);
        entity = userRepository.save(entity);
        return new UserDTO(entity);
    }

    @Transactional(readOnly = true)
    public Page<UserDTO> findAll(Pageable pageable) {
        Page<UserEntity> page = userRepository.findAll(pageable);
        return page.map(UserDTO::new);
    }

    @Transactional(readOnly = true)
    public UserDTO findById(Long id) {
        UserEntity entity = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado com id: " + id));
        return new UserDTO(entity);
    }

    @Transactional(readOnly = true)
    public UserDTO findByEmail(String email) {
        UserEntity entity = userRepository.findByEmail(email);
        if (entity == null) {
            throw new ResourceNotFoundException("Usuário não encontrado para o email informado");
        }
        return new UserDTO(entity);
    }

    private void copyDtoToEntity(UserDTO dto, UserEntity entity){
        entity.setNome(dto.getNome());
        entity.setEmail(dto.getEmail());
        entity.setSenha(dto.getSenha());
        entity.setCidade(dto.getCidade());
        entity.setBairro(dto.getBairro());
    }
}
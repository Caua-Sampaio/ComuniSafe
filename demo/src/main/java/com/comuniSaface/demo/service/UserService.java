package com.comuniSaface.demo.service;

import com.comuniSaface.demo.dto.UserDTO;
import com.comuniSaface.demo.dto.UserMinDTO;
import com.comuniSaface.demo.entities.UserEntity;
import com.comuniSaface.demo.repositories.UserRepository;
import com.comuniSaface.demo.service.exceptions.BadCredentialsException;
import com.comuniSaface.demo.service.exceptions.ResourceNotFoundException;
import org.apache.catalina.User;
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

    @Transactional(readOnly = true)
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
            throw new BadCredentialsException("Email já cadastrado");
        }else{
            copyDtoToEntity(dto, entity);
            entity = userRepository.save(entity);
            return new UserDTO(entity);
        }
    }

    private void copyDtoToEntity(UserDTO dto, UserEntity entity){
        entity.setNome(dto.getNome());
        entity.setEmail(dto.getEmail());
        entity.setSenha(dto.getSenha());
        entity.setCidade(dto.getCidade());
        entity.setBairro(dto.getBairro());
    }
}
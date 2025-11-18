package com.comuniSaface.demo.dto;

import com.comuniSaface.demo.entities.UserEntity;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


public class UserDTO {
    private Long id;
    private String nome;
    private String email;
    private String senha;
    private String bairro;
    private String cidade;
    private List<PostDTO> posts = new ArrayList<>();

    public UserDTO(){}

    public UserDTO(Long id, String nome, String email, String senha, String bairro, String cidade) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.bairro = bairro;
        this.cidade = cidade;
    }


    public UserDTO(UserEntity entity){
        this.id = entity.getId();
        this.nome = entity.getNome();
        this.email = entity.getEmail();
        this.bairro = entity.getBairro();
        this.cidade = entity.getCidade();

        if (entity.getPosts() != null){
            this.posts = entity.getPosts().stream().map(PostDTO::new).collect(Collectors.toList());
        } else {
            this.posts = new ArrayList<>();
        }
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public String getEmail() {
        return email;
    }
    public String getSenha() {
        return senha;
    }
    public void setSenha(String senha) {
        this.senha = senha;
    }
    public String getBairro() {
        return bairro;
    }
    public String getCidade() {
        return cidade;
    }
}

package com.comuniSaface.demo.dto;

import com.comuniSaface.demo.entities.UserEntity;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


public class UserDTO {

    private Long id;
    private String nome;
    private String senha;
    private String bairro;
    private String cidade;

    private List<PostDTO> posts = new ArrayList<>();

    public UserDTO(){}

    public UserDTO(Long id, String nome, String senha, String bairro, String cidade, List<PostDTO> posts) {
        this.id = id;
        this.nome = nome;
        this.senha = senha;
        this.bairro = bairro;
        this.cidade = cidade;
        this.posts = posts;
    }


    public UserDTO(UserEntity entity){
        this.id = entity.getId();
        this.nome = entity.getNome();
        this.bairro = entity.getBairro();
        this.cidade = entity.getCidade();
        this.posts = entity.getPosts()
                .stream().map(PostDTO::new)
                .collect(Collectors.toList());
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

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public List<PostDTO> getPosts() {
        return posts;
    }

    public void setPosts(List<PostDTO> posts) {
        this.posts = posts;
    }
}

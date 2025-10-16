package com.comuniSaface.demo.entities;

import com.comuniSaface.demo.dto.UserDTO;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;



@Entity
@Table(name = "post")
public class PostEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String bairro;
    private String cidade;
    @Column(columnDefinition = "TIMESTAMP WITHOUT TIME ZONE")
    private Instant moment;
    private String assunto;
    @Column(columnDefinition = "TEXT")
    private String descricao;
    private String midia;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = true)
    private UserEntity usuario;

    public PostEntity(){}

    public PostEntity(Long id, String bairro, String cidade, Instant moment, String assunto, String descricao, String midia, UserEntity usuario) {
        this.id = id;
        this.bairro = bairro;
        this.cidade = cidade;
        this.moment = moment;
        this.assunto = assunto;
        this.descricao = descricao;
        this.midia = midia;
        this.usuario = usuario;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Instant getMoment() {
        return moment;
    }

    public void setMoment(Instant moment) {
        this.moment = moment;
    }

    public String getAssunto() {
        return assunto;
    }

    public void setAssunto(String assunto) {
        this.assunto = assunto;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getMidia() {
        return midia;
    }

    public void setMidia(String midia) {
        this.midia = midia;
    }

    public UserEntity getUsuario() {
        return usuario;
    }

    public void setUsuario(UserEntity usuario) {
        this.usuario = usuario;
    }
}

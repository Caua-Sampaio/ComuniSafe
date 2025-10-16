package com.comuniSaface.demo.dto;

import com.comuniSaface.demo.entities.PostEntity;
import java.time.Instant;



public class PostDTO {

    private Long id;
    private String bairro;
    private String cidade;
    private Instant moment;
    private String assunto;
    private String descricao;
    private String midia;

    private Long usuarioId;

    public PostDTO(){}

    public PostDTO(Long id, String bairro, String cidade, Instant moment, String assunto, String descricao, String midia, Long usuarioID) {
        this.id = id;
        this.bairro = bairro;
        this.cidade = cidade;
        this.moment = moment;
        this.assunto = assunto;
        this.descricao = descricao;
        this.midia = midia;
        this.usuarioId = usuarioID;
    }

    public PostDTO(PostEntity entity) {
        this.id = entity.getId();
        this.bairro = entity.getBairro();
        this.cidade = entity.getCidade();
        this.moment = entity.getMoment();
        this.assunto = entity.getAssunto();
        this.descricao = entity.getDescricao();
        this.midia = entity.getMidia();
        this.usuarioId = (entity.getUsuario() != null) ? entity.getUsuario().getId() : null;
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

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }
}

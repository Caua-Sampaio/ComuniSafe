package com.comuniSaface.demo.dto;

import com.comuniSaface.demo.entities.PostEntity;
import org.springframework.cglib.core.Local;

import java.time.Instant;
import java.time.LocalDate;


public class PostDTO {

    private Long id;
    private String bairro;
    private String cidade;
    private LocalDate moment;
    private String assunto;
    private String descricao;
    private String midia;
    private Long usuarioId;
    private Boolean deletado;
    private Instant dataDelecao;

    public PostDTO(){}

    public PostDTO(Long id, String bairro, String cidade, LocalDate moment, String assunto, String descricao, String midia, Long usuarioID, Boolean deletado, Instant dataDelecao) {
        this.id = id;
        this.bairro = bairro;
        this.cidade = cidade;
        this.moment = moment;
        this.assunto = assunto;
        this.descricao = descricao;
        this.midia = midia;
        this.usuarioId = usuarioID;
        this.deletado = deletado;
        this.dataDelecao = dataDelecao;
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

    public LocalDate getMoment() {
        return moment;
    }

    public void setMoment(LocalDate moment) {
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

    public Boolean getDeletado() {
        return deletado;
    }

    public void setDeletado(Boolean deletado) {
        this.deletado = deletado;
    }

    public Instant getDataDelecao() {
        return dataDelecao;
    }

    public void setDataDelecao(Instant dataDelecao) {
        this.dataDelecao = dataDelecao;
    }
}

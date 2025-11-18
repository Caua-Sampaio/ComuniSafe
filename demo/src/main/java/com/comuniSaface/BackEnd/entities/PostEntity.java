package com.comuniSaface.BackEnd.entities;
import jakarta.persistence.*;
import lombok.Data;

import java.time.Instant;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "post")
public class PostEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String bairro;
    private String cidade;
    private LocalDate moment;
    @Column(name = "assunto")
    private String assunto;
    @Column(columnDefinition = "TEXT")
    private String descricao;
    @Column(name = "midia")
    private byte[] midia;
    @Column(name = "deletado", nullable = false)
    private Boolean deletado = false;
    @Column(name = "dataDelecao")
    private Instant dataDelecao;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = true)
    private UserEntity usuario;
    public PostEntity(){}
    public PostEntity(Long id, String bairro, String cidade, LocalDate moment, String assunto, String descricao, byte[] midia, UserEntity usuario, Boolean deletado, Instant dataDelecao) {
        this.id = id;
        this.bairro = bairro;
        this.cidade = cidade;
        this.moment = moment;
        this.assunto = assunto;
        this.descricao = descricao;
        this.midia = midia;
        this.usuario = usuario;
        this.deletado = deletado != null ? deletado : Boolean.FALSE;
        this.dataDelecao = dataDelecao;
    }

    public Long getId() {
        return id;
    }

    public String getBairro() {
        return bairro;
    }

    public String getCidade() {
        return cidade;
    }

    public LocalDate getMoment() {
        return moment;
    }

    public String getAssunto() {
        return assunto;
    }

    public String getDescricao() {
        return descricao;
    }

    public byte[] getMidia() {
        return midia;
    }

    public UserEntity getUsuario() {
        return usuario;
    }

    public Boolean getDeletado() {
        return deletado;
    }

    public Instant getDataDelecao() {
        return dataDelecao;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public void setMoment(LocalDate moment) {
        this.moment = moment;
    }

    public void setAssunto(String assunto) {
        this.assunto = assunto;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public void setMidia(byte[] midia) {
        this.midia = midia;
    }

    public void setUsuario(UserEntity usuario) {
        this.usuario = usuario;
    }

    public void setDeletado(Boolean deletado) {
        this.deletado = deletado;
    }

    public void setDataDelecao(Instant dataDelecao) {
        this.dataDelecao = dataDelecao;
    }
}
package com.comuniSaface.demo.dto;
import com.comuniSaface.demo.entities.PostEntity;
import lombok.Data;
import java.time.Instant;
import java.time.LocalDate;
@Data
public class PostDTO {
    private Long id;
    private String bairro;
    private String cidade;
    private LocalDate moment;
    private String assunto;
    private String descricao;
    private byte[] midia;
    private Long usuarioId;
    private Boolean deletado;
    private Instant dataDelecao;
    public PostDTO(PostEntity entity) {
        this.id = entity.getId();
        this.bairro = entity.getBairro();
        this.cidade = entity.getCidade();
        this.moment = entity.getMoment();
        this.assunto = entity.getAssunto();
        this.descricao = entity.getDescricao();
        this.midia = entity.getMidia();
        this.usuarioId = entity.getUsuario() != null ? entity.getUsuario().getId() : null;
        this.deletado = entity.getDeletado();
        this.dataDelecao = entity.getDataDelecao();
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
    public Long getUsuarioId() {
        return usuarioId;
    }
    public Boolean getDeletado() {
        return deletado;
    }
}

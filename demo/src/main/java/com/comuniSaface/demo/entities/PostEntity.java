package com.comuniSaface.demo.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.Instant;


@Table(name = "post")
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
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
    @JoinColumn
    private UsuarioEntity usuario;

}

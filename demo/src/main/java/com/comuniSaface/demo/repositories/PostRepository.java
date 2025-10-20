package com.comuniSaface.demo.repositories;

import com.comuniSaface.demo.entities.PostEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<PostEntity, Long> {

    Optional<PostEntity> findByAssuntoAndUsuarioId(String assunto, Long usuarioId);

    List<PostEntity> findByUsuarioId(Long usuarioId);

}

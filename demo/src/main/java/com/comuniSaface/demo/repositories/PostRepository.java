package com.comuniSaface.demo.repositories;

import com.comuniSaface.demo.entities.PostEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<PostEntity, Long> {

    Optional<PostEntity> findByAssuntoAndUsuarioId(String assunto, Long usuarioId);

    List<PostEntity> findByUsuarioId(Long usuarioId);


    Optional<PostEntity> findByIdAndDeletadoFalse(Long id);


    Page<PostEntity> findAllByDeletadoFalse(Pageable pageable);

}

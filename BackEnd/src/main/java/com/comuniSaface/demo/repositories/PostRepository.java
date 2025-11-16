package com.comuniSaface.demo.repositories;

import com.comuniSaface.demo.entities.PostEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<PostEntity, Long> {
    Optional<PostEntity> findByAssuntoAndUsuarioId(String assunto, Long usuarioId);
    List<PostEntity> findByUsuarioId(Long usuarioId);
    List<PostEntity> findByUsuarioIdAndDeletadoFalse(Long usuarioId);
    Page<PostEntity> findByUsuarioIdAndDeletadoFalse(Long usuarioId, Pageable pageable);
    Optional<PostEntity> findByIdAndDeletadoFalse(Long id);
    Page<PostEntity> findAllByDeletadoFalse(Pageable pageable);


    @Query(value = "SELECT p.* " +
            "FROM post p " +
            "INNER JOIN usuario u ON u.id = p.usuario_id " +
            "WHERE u.id = :usuarioId ", nativeQuery = true)
    Page<PostEntity> findByUser(Long usuarioId, Pageable pageable);
}

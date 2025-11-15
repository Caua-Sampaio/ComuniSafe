package com.comuniSaface.demo.repositories;

import com.comuniSaface.demo.entities.PostEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
<<<<<<< HEAD
=======
import org.springframework.stereotype.Repository;
>>>>>>> d8a82f098710d62514bc2ef8d91ae45a7c5fdc71

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<PostEntity, Long> {
    Optional<PostEntity> findByAssuntoAndUsuarioId(String assunto, Long usuarioId);
<<<<<<< HEAD
    List<PostEntity> findByUsuarioId(Long usuarioId);
    Optional<PostEntity> findByIdAndDeletadoFalse(Long id);
=======

    List<PostEntity> findByUsuarioIdAndDeletadoFalse(Long usuarioId);

    Page<PostEntity> findByUsuarioIdAndDeletadoFalse(Long usuarioId, Pageable pageable);

    Optional<PostEntity> findByIdAndDeletadoFalse(Long id);

>>>>>>> d8a82f098710d62514bc2ef8d91ae45a7c5fdc71
    Page<PostEntity> findAllByDeletadoFalse(Pageable pageable);
}

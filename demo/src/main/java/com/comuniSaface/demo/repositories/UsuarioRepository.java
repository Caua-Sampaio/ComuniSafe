package com.comuniSaface.demo.repositories;

import com.comuniSaface.demo.entities.UsuarioEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<UsuarioEntity, Long> {}

package com.comuniSaface.demo.repositories;

import com.comuniSaface.demo.entities.PostEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<PostEntity, Long> {}

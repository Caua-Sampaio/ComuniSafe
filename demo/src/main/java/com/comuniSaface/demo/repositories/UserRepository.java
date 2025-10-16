package com.comuniSaface.demo.repositories;

import com.comuniSaface.demo.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, Long> {}

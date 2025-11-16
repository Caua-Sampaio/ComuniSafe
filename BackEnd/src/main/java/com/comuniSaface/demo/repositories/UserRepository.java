package com.comuniSaface.demo.repositories;

import com.comuniSaface.demo.dto.UserMinDTO;
import com.comuniSaface.demo.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    @Query(value = "SELECT u.email, u.senha FROM USUARIO u " +
            "WHERE u.email = :email ", nativeQuery = true)
    public UserMinDTO searchByEmail(String email);
    @Query(value = "SELECT u.email, u.senha FROM USUARIO u " +
            "WHERE u.email = :email ", nativeQuery = true)
    public String existsByEmail(String email);
    public UserEntity findByEmail(String email);
}
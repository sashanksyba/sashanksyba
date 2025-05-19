package com.sashank.mediassist.repository;

import com.sashank.mediassist.model.ERole;
import com.sashank.mediassist.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByName(ERole name);
}
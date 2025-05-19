package com.sashank.mediassist.repository;

import com.sashank.mediassist.model.Doctor;
import com.sashank.mediassist.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    Optional<Doctor> findByUser(User user);
    
    List<Doctor> findBySpecialization(String specialization);
    
    List<Doctor> findByDepartment(String department);
}
package com.sashank.mediassist.repository;

import com.sashank.mediassist.model.Appointment;
import com.sashank.mediassist.model.Doctor;
import com.sashank.mediassist.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByPatient(Patient patient);
    
    List<Appointment> findByDoctor(Doctor doctor);
    
    List<Appointment> findByStatus(Appointment.AppointmentStatus status);
    
    @Query("SELECT a FROM Appointment a WHERE a.doctor = ?1 AND a.appointmentDateTime BETWEEN ?2 AND ?3")
    List<Appointment> findByDoctorAndDateRange(Doctor doctor, LocalDateTime start, LocalDateTime end);
    
    @Query("SELECT a FROM Appointment a WHERE a.patient = ?1 AND a.appointmentDateTime BETWEEN ?2 AND ?3")
    List<Appointment> findByPatientAndDateRange(Patient patient, LocalDateTime start, LocalDateTime end);
    
    @Query("SELECT a FROM Appointment a WHERE a.appointmentDateTime BETWEEN ?1 AND ?2")
    List<Appointment> findByDateRange(LocalDateTime start, LocalDateTime end);
    
    @Query("SELECT a FROM Appointment a WHERE a.doctor = ?1 AND a.status = ?2")
    List<Appointment> findByDoctorAndStatus(Doctor doctor, Appointment.AppointmentStatus status);
    
    @Query("SELECT a FROM Appointment a WHERE a.patient = ?1 AND a.status = ?2")
    List<Appointment> findByPatientAndStatus(Patient patient, Appointment.AppointmentStatus status);
}
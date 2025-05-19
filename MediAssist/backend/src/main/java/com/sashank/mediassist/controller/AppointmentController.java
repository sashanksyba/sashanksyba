package com.sashank.mediassist.controller;

import com.sashank.mediassist.dto.response.MessageResponse;
import com.sashank.mediassist.model.Appointment;
import com.sashank.mediassist.model.Doctor;
import com.sashank.mediassist.model.Patient;
import com.sashank.mediassist.model.User;
import com.sashank.mediassist.repository.AppointmentRepository;
import com.sashank.mediassist.repository.DoctorRepository;
import com.sashank.mediassist.repository.PatientRepository;
import com.sashank.mediassist.repository.UserRepository;
import com.sashank.mediassist.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {
    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<?> createAppointment(@RequestBody Appointment appointmentRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        
        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        
        Patient patient = patientRepository.findByUser(user)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Patient profile not found"));
        
        Doctor doctor = doctorRepository.findById(appointmentRequest.getDoctor().getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Doctor not found"));
        
        // Check if the appointment time is available
        LocalDateTime requestedTime = appointmentRequest.getAppointmentDateTime();
        List<Appointment> existingAppointments = appointmentRepository.findByDoctorAndDateRange(
                doctor, 
                requestedTime.minusMinutes(30), 
                requestedTime.plusMinutes(30)
        );
        
        if (!existingAppointments.isEmpty()) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: The selected time slot is not available."));
        }
        
        Appointment appointment = new Appointment();
        appointment.setPatient(patient);
        appointment.setDoctor(doctor);
        appointment.setAppointmentDateTime(appointmentRequest.getAppointmentDateTime());
        appointment.setReason(appointmentRequest.getReason());
        appointment.setStatus(Appointment.AppointmentStatus.SCHEDULED);
        appointment.setNotes(appointmentRequest.getNotes());
        
        Appointment savedAppointment = appointmentRepository.save(appointment);
        return ResponseEntity.ok(savedAppointment);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('PATIENT') or hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<Appointment> getAppointmentById(@PathVariable Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Appointment not found"));
        
        // Check if the current user has access to this appointment
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        
        boolean isAdmin = userDetails.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        
        if (!isAdmin) {
            Patient patient = patientRepository.findByUser(user).orElse(null);
            Doctor doctor = doctorRepository.findByUser(user).orElse(null);
            
            if ((patient != null && appointment.getPatient().getId().equals(patient.getId())) ||
                (doctor != null && appointment.getDoctor().getId().equals(doctor.getId()))) {
                // User is either the patient or doctor for this appointment
                return ResponseEntity.ok(appointment);
            } else {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You don't have access to this appointment");
            }
        }
        
        return ResponseEntity.ok(appointment);
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<Appointment> updateAppointmentStatus(
            @PathVariable Long id,
            @RequestBody Appointment appointmentUpdate) {
        
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Appointment not found"));
        
        // Check if the current user is the doctor for this appointment
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        
        boolean isAdmin = userDetails.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        
        if (!isAdmin) {
            Doctor doctor = doctorRepository.findByUser(user).orElse(null);
            
            if (doctor == null || !appointment.getDoctor().getId().equals(doctor.getId())) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, 
                        "Only the assigned doctor or an admin can update this appointment");
            }
        }
        
        appointment.setStatus(appointmentUpdate.getStatus());
        appointment.setNotes(appointmentUpdate.getNotes());
        
        Appointment updatedAppointment = appointmentRepository.save(appointment);
        return ResponseEntity.ok(updatedAppointment);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('PATIENT') or hasRole('ADMIN')")
    public ResponseEntity<?> cancelAppointment(@PathVariable Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Appointment not found"));
        
        // Check if the current user is the patient for this appointment
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        
        boolean isAdmin = userDetails.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        
        if (!isAdmin) {
            Patient patient = patientRepository.findByUser(user).orElse(null);
            
            if (patient == null || !appointment.getPatient().getId().equals(patient.getId())) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, 
                        "Only the patient who made the appointment or an admin can cancel it");
            }
        }
        
        // Instead of deleting, mark as cancelled
        appointment.setStatus(Appointment.AppointmentStatus.CANCELLED);
        appointmentRepository.save(appointment);
        
        return ResponseEntity.ok(new MessageResponse("Appointment cancelled successfully"));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        List<Appointment> appointments = appointmentRepository.findAll();
        return ResponseEntity.ok(appointments);
    }
    
    @GetMapping("/status/{status}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Appointment>> getAppointmentsByStatus(@PathVariable String status) {
        Appointment.AppointmentStatus appointmentStatus = Appointment.AppointmentStatus.valueOf(status.toUpperCase());
        List<Appointment> appointments = appointmentRepository.findByStatus(appointmentStatus);
        return ResponseEntity.ok(appointments);
    }
}
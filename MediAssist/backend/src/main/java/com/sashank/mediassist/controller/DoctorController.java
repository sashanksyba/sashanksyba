package com.sashank.mediassist.controller;

import com.sashank.mediassist.model.Appointment;
import com.sashank.mediassist.model.Doctor;
import com.sashank.mediassist.model.Schedule;
import com.sashank.mediassist.model.User;
import com.sashank.mediassist.repository.AppointmentRepository;
import com.sashank.mediassist.repository.DoctorRepository;
import com.sashank.mediassist.repository.ScheduleRepository;
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
@RequestMapping("/api/doctors")
public class DoctorController {
    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;
    
    @Autowired
    private ScheduleRepository scheduleRepository;

    @GetMapping("/profile")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<Doctor> getDoctorProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        
        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        
        Doctor doctor = doctorRepository.findByUser(user)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Doctor profile not found"));
        
        return ResponseEntity.ok(doctor);
    }

    @PostMapping("/profile")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<Doctor> createOrUpdateDoctorProfile(@RequestBody Doctor doctorDetails) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        
        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        
        Doctor doctor = doctorRepository.findByUser(user).orElse(new Doctor());
        doctor.setUser(user);
        doctor.setSpecialization(doctorDetails.getSpecialization());
        doctor.setDepartment(doctorDetails.getDepartment());
        doctor.setQualification(doctorDetails.getQualification());
        doctor.setExperience(doctorDetails.getExperience());
        doctor.setLicenseNumber(doctorDetails.getLicenseNumber());
        doctor.setConsultationFee(doctorDetails.getConsultationFee());
        doctor.setPhoneNumber(doctorDetails.getPhoneNumber());
        doctor.setAddress(doctorDetails.getAddress());
        doctor.setBio(doctorDetails.getBio());
        
        Doctor savedDoctor = doctorRepository.save(doctor);
        return ResponseEntity.ok(savedDoctor);
    }

    @GetMapping("/appointments")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<List<Appointment>> getDoctorAppointments() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        
        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        
        Doctor doctor = doctorRepository.findByUser(user)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Doctor profile not found"));
        
        List<Appointment> appointments = appointmentRepository.findByDoctor(doctor);
        return ResponseEntity.ok(appointments);
    }
    
    @GetMapping("/appointments/today")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<List<Appointment>> getTodayAppointments() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        
        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        
        Doctor doctor = doctorRepository.findByUser(user)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Doctor profile not found"));
        
        LocalDateTime startOfDay = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0);
        LocalDateTime endOfDay = LocalDateTime.now().withHour(23).withMinute(59).withSecond(59);
        
        List<Appointment> appointments = appointmentRepository.findByDoctorAndDateRange(doctor, startOfDay, endOfDay);
        return ResponseEntity.ok(appointments);
    }
    
    @PostMapping("/schedule")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<Schedule> addSchedule(@RequestBody Schedule schedule) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        
        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        
        Doctor doctor = doctorRepository.findByUser(user)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Doctor profile not found"));
        
        schedule.setDoctor(doctor);
        Schedule savedSchedule = scheduleRepository.save(schedule);
        return ResponseEntity.ok(savedSchedule);
    }
    
    @GetMapping("/schedule")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<List<Schedule>> getDoctorSchedule() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        
        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        
        Doctor doctor = doctorRepository.findByUser(user)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Doctor profile not found"));
        
        List<Schedule> schedules = scheduleRepository.findByDoctor(doctor);
        return ResponseEntity.ok(schedules);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Doctor> getDoctorById(@PathVariable Long id) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Doctor not found"));
        
        return ResponseEntity.ok(doctor);
    }

    @GetMapping
    public ResponseEntity<List<Doctor>> getAllDoctors() {
        List<Doctor> doctors = doctorRepository.findAll();
        return ResponseEntity.ok(doctors);
    }
    
    @GetMapping("/specialization/{specialization}")
    public ResponseEntity<List<Doctor>> getDoctorsBySpecialization(@PathVariable String specialization) {
        List<Doctor> doctors = doctorRepository.findBySpecialization(specialization);
        return ResponseEntity.ok(doctors);
    }
    
    @GetMapping("/department/{department}")
    public ResponseEntity<List<Doctor>> getDoctorsByDepartment(@PathVariable String department) {
        List<Doctor> doctors = doctorRepository.findByDepartment(department);
        return ResponseEntity.ok(doctors);
    }
}
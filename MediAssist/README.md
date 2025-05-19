# MediAssist - Healthcare Management System

A comprehensive healthcare management system built with Spring Boot and React, designed to streamline patient care, appointment scheduling, and medical record management.

## 🏥 Features

- **Patient Management**: Register, update, and manage patient information
- **Appointment Scheduling**: Book, reschedule, and cancel appointments
- **Doctor Dashboard**: View daily appointments and patient history
- **Medical Records**: Store and retrieve patient medical history
- **Prescription Management**: Create and track prescriptions
- **Secure Authentication**: Role-based access control (Admin, Doctor, Patient)
- **Notifications**: Email and in-app notifications for appointments
- **Reports**: Generate and export medical reports

## 🛠️ Technology Stack

### Backend
- Java 17
- Spring Boot 3.0
- Spring Security with JWT Authentication
- Spring Data JPA
- MySQL Database
- Maven
- JUnit & Mockito for testing

### Frontend
- React.js
- Redux for state management
- Material-UI components
- Axios for API communication
- Chart.js for data visualization
- React Router for navigation

## 📋 System Architecture

The system follows a microservices architecture with:

1. **Authentication Service**: Handles user registration, login, and JWT token management
2. **Patient Service**: Manages patient information and medical records
3. **Appointment Service**: Handles scheduling and notifications
4. **Prescription Service**: Manages medication prescriptions
5. **Reporting Service**: Generates medical and administrative reports

## 🔧 Setup and Installation

### Prerequisites
- Java 17+
- Node.js 16+
- MySQL 8.0+
- Maven 3.8+

### Backend Setup
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## 📊 Database Schema

The system uses a relational database with the following core entities:
- Users (Admin, Doctor, Patient)
- Patients
- Appointments
- Medical Records
- Prescriptions
- Medications

## 🔒 Security Features

- JWT-based authentication
- Password encryption
- Role-based access control
- HTTPS enforcement
- Input validation
- Protection against SQL injection and XSS attacks

## 📱 Screenshots

[Coming soon]

## 🚀 Future Enhancements

- Mobile application (React Native)
- Telemedicine integration
- Payment processing
- AI-based diagnosis assistance
- Integration with wearable health devices

## 👨‍💻 Author

- **Sashank** - [GitHub Profile](https://github.com/sashanksyba)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
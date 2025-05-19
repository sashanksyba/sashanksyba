import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PatientDashboard from './pages/patient/Dashboard';
import PatientProfile from './pages/patient/Profile';
import PatientAppointments from './pages/patient/Appointments';
import PatientMedicalRecords from './pages/patient/MedicalRecords';
import DoctorDashboard from './pages/doctor/Dashboard';
import DoctorProfile from './pages/doctor/Profile';
import DoctorSchedule from './pages/doctor/Schedule';
import DoctorAppointments from './pages/doctor/Appointments';
import DoctorPatients from './pages/doctor/Patients';
import NotFound from './pages/NotFound';

// Services
import AuthService from './services/auth.service';

// Auth Guard Component
const PrivateRoute = ({ children, roles }) => {
  const currentUser = AuthService.getCurrentUser();
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  if (roles && !roles.includes(currentUser.role)) {
    return <Navigate to="/" />;
  }
  
  return children;
};

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);
  
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    
    if (user) {
      setCurrentUser(user);
    }
  }, []);
  
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header currentUser={currentUser} />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Patient Routes */}
          <Route 
            path="/patient/dashboard" 
            element={
              <PrivateRoute roles={["ROLE_PATIENT"]}>
                <PatientDashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/patient/profile" 
            element={
              <PrivateRoute roles={["ROLE_PATIENT"]}>
                <PatientProfile />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/patient/appointments" 
            element={
              <PrivateRoute roles={["ROLE_PATIENT"]}>
                <PatientAppointments />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/patient/medical-records" 
            element={
              <PrivateRoute roles={["ROLE_PATIENT"]}>
                <PatientMedicalRecords />
              </PrivateRoute>
            } 
          />
          
          {/* Doctor Routes */}
          <Route 
            path="/doctor/dashboard" 
            element={
              <PrivateRoute roles={["ROLE_DOCTOR"]}>
                <DoctorDashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/doctor/profile" 
            element={
              <PrivateRoute roles={["ROLE_DOCTOR"]}>
                <DoctorProfile />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/doctor/schedule" 
            element={
              <PrivateRoute roles={["ROLE_DOCTOR"]}>
                <DoctorSchedule />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/doctor/appointments" 
            element={
              <PrivateRoute roles={["ROLE_DOCTOR"]}>
                <DoctorAppointments />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/doctor/patients" 
            element={
              <PrivateRoute roles={["ROLE_DOCTOR"]}>
                <DoctorPatients />
              </PrivateRoute>
            } 
          />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;

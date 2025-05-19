import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaUser, FaSignOutAlt, FaCalendarAlt, FaFileMedical, FaUserMd, FaHome } from 'react-icons/fa';
import AuthService from '../services/auth.service';

const Header = ({ currentUser }) => {
  const navigate = useNavigate();

  const logOut = () => {
    AuthService.logout();
    navigate('/login');
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img 
            src="/logo.png" 
            alt="MediAssist Logo" 
            height="30" 
            className="d-inline-block align-top me-2" 
          />
          MediAssist
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              <FaHome className="me-1" /> Home
            </Nav.Link>
            
            {currentUser && currentUser.roles.includes('ROLE_PATIENT') && (
              <>
                <Nav.Link as={Link} to="/patient/dashboard">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/patient/appointments">
                  <FaCalendarAlt className="me-1" /> Appointments
                </Nav.Link>
                <Nav.Link as={Link} to="/patient/medical-records">
                  <FaFileMedical className="me-1" /> Medical Records
                </Nav.Link>
              </>
            )}
            
            {currentUser && currentUser.roles.includes('ROLE_DOCTOR') && (
              <>
                <Nav.Link as={Link} to="/doctor/dashboard">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/doctor/appointments">
                  <FaCalendarAlt className="me-1" /> Appointments
                </Nav.Link>
                <Nav.Link as={Link} to="/doctor/schedule">Schedule</Nav.Link>
                <Nav.Link as={Link} to="/doctor/patients">
                  <FaUserMd className="me-1" /> Patients
                </Nav.Link>
              </>
            )}
          </Nav>
          
          <Nav>
            {currentUser ? (
              <NavDropdown 
                title={
                  <span>
                    <FaUser className="me-1" /> {currentUser.username}
                  </span>
                } 
                id="user-dropdown"
              >
                <NavDropdown.Item 
                  as={Link} 
                  to={currentUser.roles.includes('ROLE_PATIENT') ? "/patient/profile" : "/doctor/profile"}
                >
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logOut}>
                  <FaSignOutAlt className="me-1" /> Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

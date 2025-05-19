import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaFileMedical, FaUserMd, FaClock, FaExclamationCircle } from 'react-icons/fa';
import api from '../../services/api.service';
import AuthService from '../../services/auth.service';

const PatientDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [recentPrescriptions, setRecentPrescriptions] = useState([]);
  const [stats, setStats] = useState({
    totalAppointments: 0,
    pendingAppointments: 0,
    completedAppointments: 0,
    cancelledAppointments: 0
  });
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    // In a real application, these would be actual API calls
    // For now, we'll simulate the data
    
    // Simulate loading
    setTimeout(() => {
      // Mock data
      const mockAppointments = [
        {
          id: 1,
          doctorName: 'Dr. Sarah Johnson',
          specialty: 'Cardiology',
          date: '2023-06-15',
          time: '10:00 AM',
          status: 'CONFIRMED'
        },
        {
          id: 2,
          doctorName: 'Dr. Michael Chen',
          specialty: 'Dermatology',
          date: '2023-06-20',
          time: '2:30 PM',
          status: 'PENDING'
        }
      ];
      
      const mockPrescriptions = [
        {
          id: 1,
          doctorName: 'Dr. Sarah Johnson',
          date: '2023-06-01',
          medications: [
            { name: 'Amoxicillin', dosage: '500mg', frequency: 'Twice daily', duration: '7 days' }
          ]
        },
        {
          id: 2,
          doctorName: 'Dr. Robert Williams',
          date: '2023-05-15',
          medications: [
            { name: 'Ibuprofen', dosage: '400mg', frequency: 'As needed', duration: '5 days' },
            { name: 'Cetirizine', dosage: '10mg', frequency: 'Once daily', duration: '14 days' }
          ]
        }
      ];
      
      const mockStats = {
        totalAppointments: 12,
        pendingAppointments: 2,
        completedAppointments: 9,
        cancelledAppointments: 1
      };
      
      setUpcomingAppointments(mockAppointments);
      setRecentPrescriptions(mockPrescriptions);
      setStats(mockStats);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusBadge = (status) => {
    switch(status) {
      case 'CONFIRMED':
        return <Badge bg="success">Confirmed</Badge>;
      case 'PENDING':
        return <Badge bg="warning">Pending</Badge>;
      case 'CANCELLED':
        return <Badge bg="danger">Cancelled</Badge>;
      case 'COMPLETED':
        return <Badge bg="info">Completed</Badge>;
      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4">Patient Dashboard</h1>
      <p className="lead mb-4">Welcome back, {currentUser?.username || 'Patient'}!</p>
      
      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={3} sm={6} className="mb-3 mb-md-0">
          <Card className="dashboard-card text-center h-100">
            <Card.Body>
              <div className="display-4 mb-2">{stats.totalAppointments}</div>
              <Card.Title>Total Appointments</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} className="mb-3 mb-md-0">
          <Card className="dashboard-card text-center h-100">
            <Card.Body>
              <div className="display-4 mb-2">{stats.pendingAppointments}</div>
              <Card.Title>Pending</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} className="mb-3 mb-md-0">
          <Card className="dashboard-card text-center h-100">
            <Card.Body>
              <div className="display-4 mb-2">{stats.completedAppointments}</div>
              <Card.Title>Completed</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} className="mb-3 mb-md-0">
          <Card className="dashboard-card text-center h-100">
            <Card.Body>
              <div className="display-4 mb-2">{stats.cancelledAppointments}</div>
              <Card.Title>Cancelled</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Quick Actions */}
      <Row className="mb-4">
        <Col>
          <Card className="dashboard-card">
            <Card.Header>Quick Actions</Card.Header>
            <Card.Body>
              <div className="d-flex flex-wrap gap-2">
                <Button as={Link} to="/patient/appointments/new" variant="primary">
                  <FaCalendarAlt className="me-2" /> Book Appointment
                </Button>
                <Button as={Link} to="/patient/medical-records" variant="outline-primary">
                  <FaFileMedical className="me-2" /> View Medical Records
                </Button>
                <Button as={Link} to="/patient/doctors" variant="outline-primary">
                  <FaUserMd className="me-2" /> Find Doctors
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Upcoming Appointments */}
      <Row className="mb-4">
        <Col md={6} className="mb-4 mb-md-0">
          <Card className="dashboard-card h-100">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <span>Upcoming Appointments</span>
              <Button as={Link} to="/patient/appointments" variant="outline-light" size="sm">View All</Button>
            </Card.Header>
            <Card.Body>
              {loading ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : upcomingAppointments.length > 0 ? (
                <ListGroup variant="flush">
                  {upcomingAppointments.map(appointment => (
                    <ListGroup.Item key={appointment.id} className={`appointment-item ${appointment.status.toLowerCase()}`}>
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h5 className="mb-1">{appointment.doctorName}</h5>
                          <p className="mb-1 text-muted">{appointment.specialty}</p>
                          <div className="d-flex align-items-center">
                            <FaCalendarAlt className="me-2 text-primary" />
                            <span>{appointment.date}</span>
                            <FaClock className="ms-3 me-2 text-primary" />
                            <span>{appointment.time}</span>
                          </div>
                        </div>
                        <div>
                          {getStatusBadge(appointment.status)}
                        </div>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <div className="text-center py-4">
                  <FaExclamationCircle size={40} className="text-muted mb-3" />
                  <p>No upcoming appointments found.</p>
                  <Button as={Link} to="/patient/appointments/new" variant="primary" size="sm">
                    Book an Appointment
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
        
        {/* Recent Prescriptions */}
        <Col md={6}>
          <Card className="dashboard-card h-100">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <span>Recent Prescriptions</span>
              <Button as={Link} to="/patient/medical-records" variant="outline-light" size="sm">View All</Button>
            </Card.Header>
            <Card.Body>
              {loading ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : recentPrescriptions.length > 0 ? (
                <ListGroup variant="flush">
                  {recentPrescriptions.map(prescription => (
                    <ListGroup.Item key={prescription.id}>
                      <div className="mb-2">
                        <h5 className="mb-1">{prescription.doctorName}</h5>
                        <p className="mb-1 text-muted">
                          <FaCalendarAlt className="me-2" />
                          {prescription.date}
                        </p>
                      </div>
                      <div>
                        <strong>Medications:</strong>
                        <ul className="mb-0">
                          {prescription.medications.map((med, index) => (
                            <li key={index}>
                              {med.name} - {med.dosage}, {med.frequency}, {med.duration}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <div className="text-center py-4">
                  <FaExclamationCircle size={40} className="text-muted mb-3" />
                  <p>No recent prescriptions found.</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PatientDashboard;

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaUserInjured, FaClock, FaExclamationCircle, FaChartLine } from 'react-icons/fa';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import api from '../../services/api.service';
import AuthService from '../../services/auth.service';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const DoctorDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalAppointments: 0,
    todayAppointments: 0,
    pendingAppointments: 0
  });
  const [appointmentStats, setAppointmentStats] = useState({
    confirmed: 0,
    pending: 0,
    cancelled: 0,
    completed: 0
  });
  const [weeklyAppointments, setWeeklyAppointments] = useState([]);
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    // In a real application, these would be actual API calls
    // For now, we'll simulate the data
    
    // Simulate loading
    setTimeout(() => {
      // Mock data
      const mockTodayAppointments = [
        {
          id: 1,
          patientName: 'John Smith',
          age: 45,
          time: '10:00 AM',
          reason: 'Follow-up consultation',
          status: 'CONFIRMED'
        },
        {
          id: 2,
          patientName: 'Emily Johnson',
          age: 32,
          time: '11:30 AM',
          reason: 'Annual check-up',
          status: 'CONFIRMED'
        },
        {
          id: 3,
          patientName: 'Michael Brown',
          age: 58,
          time: '2:00 PM',
          reason: 'Chest pain evaluation',
          status: 'CONFIRMED'
        }
      ];
      
      const mockStats = {
        totalPatients: 156,
        totalAppointments: 89,
        todayAppointments: 3,
        pendingAppointments: 5
      };
      
      const mockAppointmentStats = {
        confirmed: 25,
        pending: 5,
        cancelled: 3,
        completed: 56
      };
      
      const mockWeeklyAppointments = [
        { day: 'Monday', count: 5 },
        { day: 'Tuesday', count: 7 },
        { day: 'Wednesday', count: 3 },
        { day: 'Thursday', count: 8 },
        { day: 'Friday', count: 6 },
        { day: 'Saturday', count: 4 },
        { day: 'Sunday', count: 0 }
      ];
      
      setTodayAppointments(mockTodayAppointments);
      setStats(mockStats);
      setAppointmentStats(mockAppointmentStats);
      setWeeklyAppointments(mockWeeklyAppointments);
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

  // Prepare chart data
  const pieChartData = {
    labels: ['Confirmed', 'Pending', 'Cancelled', 'Completed'],
    datasets: [
      {
        data: [
          appointmentStats.confirmed,
          appointmentStats.pending,
          appointmentStats.cancelled,
          appointmentStats.completed
        ],
        backgroundColor: [
          'rgba(40, 167, 69, 0.7)',
          'rgba(255, 193, 7, 0.7)',
          'rgba(220, 53, 69, 0.7)',
          'rgba(23, 162, 184, 0.7)'
        ],
        borderColor: [
          'rgba(40, 167, 69, 1)',
          'rgba(255, 193, 7, 1)',
          'rgba(220, 53, 69, 1)',
          'rgba(23, 162, 184, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const barChartData = {
    labels: weeklyAppointments.map(item => item.day),
    datasets: [
      {
        label: 'Appointments',
        data: weeklyAppointments.map(item => item.count),
        backgroundColor: 'rgba(13, 110, 253, 0.7)',
        borderColor: 'rgba(13, 110, 253, 1)',
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Weekly Appointments',
      },
    },
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4">Doctor Dashboard</h1>
      <p className="lead mb-4">Welcome back, Dr. {currentUser?.username || 'User'}!</p>
      
      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={3} sm={6} className="mb-3 mb-md-0">
          <Card className="dashboard-card text-center h-100">
            <Card.Body>
              <div className="display-4 mb-2">{stats.totalPatients}</div>
              <Card.Title>Total Patients</Card.Title>
            </Card.Body>
          </Card>
        </Col>
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
              <div className="display-4 mb-2">{stats.todayAppointments}</div>
              <Card.Title>Today's Appointments</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} className="mb-3 mb-md-0">
          <Card className="dashboard-card text-center h-100">
            <Card.Body>
              <div className="display-4 mb-2">{stats.pendingAppointments}</div>
              <Card.Title>Pending Requests</Card.Title>
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
                <Button as={Link} to="/doctor/schedule" variant="primary">
                  <FaCalendarAlt className="me-2" /> Manage Schedule
                </Button>
                <Button as={Link} to="/doctor/appointments" variant="outline-primary">
                  <FaClock className="me-2" /> View All Appointments
                </Button>
                <Button as={Link} to="/doctor/patients" variant="outline-primary">
                  <FaUserInjured className="me-2" /> Patient Records
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row className="mb-4">
        {/* Today's Appointments */}
        <Col lg={8} className="mb-4 mb-lg-0">
          <Card className="dashboard-card h-100">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <span>Today's Appointments</span>
              <Button as={Link} to="/doctor/appointments" variant="outline-light" size="sm">View All</Button>
            </Card.Header>
            <Card.Body>
              {loading ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : todayAppointments.length > 0 ? (
                <ListGroup variant="flush">
                  {todayAppointments.map(appointment => (
                    <ListGroup.Item key={appointment.id} className={`appointment-item ${appointment.status.toLowerCase()}`}>
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h5 className="mb-1">{appointment.patientName}</h5>
                          <p className="mb-1 text-muted">Age: {appointment.age} | Reason: {appointment.reason}</p>
                          <div className="d-flex align-items-center">
                            <FaClock className="me-2 text-primary" />
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
                  <p>No appointments scheduled for today.</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
        
        {/* Appointment Status Chart */}
        <Col lg={4}>
          <Card className="dashboard-card h-100">
            <Card.Header>
              <span>Appointment Status</span>
            </Card.Header>
            <Card.Body>
              {loading ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <Pie data={pieChartData} />
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Weekly Appointments Chart */}
      <Row>
        <Col>
          <Card className="dashboard-card">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <span>Weekly Appointment Trends</span>
              <FaChartLine />
            </Card.Header>
            <Card.Body>
              {loading ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <Bar data={barChartData} options={barChartOptions} height={100} />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DoctorDashboard;

import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUserMd, FaCalendarAlt, FaFileMedical, FaMobileAlt, FaLock, FaChartLine } from 'react-icons/fa';

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="bg-primary text-white py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <h1 className="display-4 fw-bold mb-3">Healthcare Management Made Simple</h1>
              <p className="lead mb-4">
                MediAssist streamlines healthcare operations, connecting patients with doctors for better care and simplified management.
              </p>
              <div className="d-flex gap-3">
                <Button as={Link} to="/register" variant="light" size="lg">
                  Get Started
                </Button>
                <Button as={Link} to="/login" variant="outline-light" size="lg">
                  Login
                </Button>
              </div>
            </Col>
            <Col lg={6}>
              <img 
                src="/assets/images/hero-image.svg" 
                alt="Healthcare Illustration" 
                className="img-fluid rounded shadow"
              />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Features Section */}
      <Container className="py-5">
        <h2 className="text-center mb-5">Key Features</h2>
        <Row>
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body className="d-flex flex-column align-items-center text-center p-4">
                <div className="icon-wrapper bg-primary text-white rounded-circle p-3 mb-3">
                  <FaUserMd size={30} />
                </div>
                <Card.Title>Doctor Appointments</Card.Title>
                <Card.Text>
                  Schedule appointments with qualified healthcare professionals with just a few clicks.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body className="d-flex flex-column align-items-center text-center p-4">
                <div className="icon-wrapper bg-primary text-white rounded-circle p-3 mb-3">
                  <FaFileMedical size={30} />
                </div>
                <Card.Title>Medical Records</Card.Title>
                <Card.Text>
                  Access your complete medical history, prescriptions, and test results anytime, anywhere.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body className="d-flex flex-column align-items-center text-center p-4">
                <div className="icon-wrapper bg-primary text-white rounded-circle p-3 mb-3">
                  <FaCalendarAlt size={30} />
                </div>
                <Card.Title>Smart Scheduling</Card.Title>
                <Card.Text>
                  Intelligent scheduling system that helps doctors manage their time efficiently.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body className="d-flex flex-column align-items-center text-center p-4">
                <div className="icon-wrapper bg-primary text-white rounded-circle p-3 mb-3">
                  <FaMobileAlt size={30} />
                </div>
                <Card.Title>Mobile Access</Card.Title>
                <Card.Text>
                  Access the platform from any device with our responsive web application.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body className="d-flex flex-column align-items-center text-center p-4">
                <div className="icon-wrapper bg-primary text-white rounded-circle p-3 mb-3">
                  <FaLock size={30} />
                </div>
                <Card.Title>Secure & Private</Card.Title>
                <Card.Text>
                  Your data is protected with industry-standard security measures and encryption.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body className="d-flex flex-column align-items-center text-center p-4">
                <div className="icon-wrapper bg-primary text-white rounded-circle p-3 mb-3">
                  <FaChartLine size={30} />
                </div>
                <Card.Title>Health Analytics</Card.Title>
                <Card.Text>
                  Track your health metrics and get insights to improve your overall wellbeing.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* How It Works Section */}
      <div className="bg-light py-5">
        <Container>
          <h2 className="text-center mb-5">How It Works</h2>
          <Row className="g-4">
            <Col md={4}>
              <div className="text-center">
                <div className="step-number bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                  <h3 className="m-0">1</h3>
                </div>
                <h4>Create an Account</h4>
                <p>Register as a patient or doctor to get started with MediAssist.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="text-center">
                <div className="step-number bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                  <h3 className="m-0">2</h3>
                </div>
                <h4>Complete Your Profile</h4>
                <p>Add your medical history, preferences, and availability.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="text-center">
                <div className="step-number bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                  <h3 className="m-0">3</h3>
                </div>
                <h4>Start Using the Platform</h4>
                <p>Schedule appointments, manage records, and improve healthcare outcomes.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* CTA Section */}
      <Container className="py-5 text-center">
        <h2 className="mb-4">Ready to Transform Healthcare Management?</h2>
        <p className="lead mb-4">Join thousands of patients and healthcare providers already using MediAssist.</p>
        <Button as={Link} to="/register" variant="primary" size="lg" className="px-4 py-2">
          Get Started Today
        </Button>
      </Container>
    </>
  );
};

export default Home;

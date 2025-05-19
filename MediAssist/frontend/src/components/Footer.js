import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaHeart, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <Container>
        <Row>
          <Col md={4} className="mb-3 mb-md-0">
            <h5>MediAssist</h5>
            <p className="text-muted">
              A comprehensive healthcare management system designed to streamline patient care and medical practice operations.
            </p>
          </Col>
          <Col md={4} className="mb-3 mb-md-0">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-decoration-none text-light">Home</a></li>
              <li><a href="/login" className="text-decoration-none text-light">Login</a></li>
              <li><a href="/register" className="text-decoration-none text-light">Register</a></li>
              <li><a href="#" className="text-decoration-none text-light">Privacy Policy</a></li>
              <li><a href="#" className="text-decoration-none text-light">Terms of Service</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Connect With Us</h5>
            <div className="d-flex gap-3 fs-4">
              <a href="#" className="text-light">
                <FaGithub />
              </a>
              <a href="#" className="text-light">
                <FaLinkedin />
              </a>
              <a href="#" className="text-light">
                <FaTwitter />
              </a>
            </div>
          </Col>
        </Row>
        <hr className="my-3" />
        <Row>
          <Col className="text-center">
            <p className="mb-0">
              &copy; {currentYear} MediAssist. All rights reserved. Made with <FaHeart className="text-danger" /> by Sashank
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

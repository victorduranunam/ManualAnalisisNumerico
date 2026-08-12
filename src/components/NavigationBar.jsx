import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { capitulosData, pythonData } from '../data/capitulosData';

function NavigationBar({ activeSection, onSelectSection }) {
  return (
    <Navbar bg="dark" variant="dark" expand="xl" className="shadow-sm sticky-top">
      <Container fluid>
        <Navbar.Brand 
          style={{ cursor: 'pointer' }} 
          onClick={() => onSelectSection('inicio')}
          className="fw-bold text-warning fs-6"
        >
          <i className="bi bi-mortarboard-fill me-2"></i>PAPIME 112032
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link 
              active={activeSection === 'inicio'} 
              onClick={() => onSelectSection('inicio')}
            >
              <i className="bi bi-house-door me-1"></i> Inicio
            </Nav.Link>

            <Nav.Link 
              active={activeSection === 'python'} 
              onClick={() => onSelectSection('python')}
            >
              <i className="bi bi-code-square me-1"></i> Intro a Python
            </Nav.Link>

            <NavDropdown title={<span><i className="bi bi-journal-text me-1"></i> Capítulos</span>} id="nav-capitulos-dropdown">
              {capitulosData.map((cap) => (
                <NavDropdown.Item 
                  key={cap.id} 
                  active={activeSection === cap.id}
                  onClick={() => onSelectSection(cap.id)}
                >
                  <i className={`bi ${cap.icon} me-2`}></i>
                  {cap.title}
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            <NavDropdown title={<span><i className="bi bi-filetype-py me-1"></i> Módulos Python</span>} id="nav-python-dropdown">
              {pythonData.map((py) => (
                <NavDropdown.Item 
                  key={py.id} 
                  active={activeSection === py.id}
                  onClick={() => onSelectSection(py.id)}
                >
                  <i className={`bi ${py.icon} me-2`}></i>
                  {py.title}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
// ✅ Importación actualizada: analisisNumericoData en lugar de capitulosData
import { analisisNumericoData, pythonData } from '../data/capitulosData';

function NavigationBar({ activeSection, onSelectSection }) {
  return (
    /* 
       Añadimos zIndex: 1050 para que el desplegable del menú flote 
       por encima de la barra lateral del capítulo.
    */
    <Navbar 
      bg="dark" 
      variant="dark" 
      expand="md" 
      className="shadow-sm sticky-top"
      style={{ zIndex: 1050 }}
    >
      <Container fluid>
        <Navbar.Brand 
          style={{ cursor: 'pointer' }} 
          onClick={() => onSelectSection('inicio')}
          className="fw-bold text-warning fs-6"
        >
          <i className="bi bi-mortarboard-fill me-2"></i>PAPIME 103226
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

            {/* ✅ Desplegable de Análisis Numérico */}
            <NavDropdown title={<span><i className="bi bi-journal-text me-1"></i> Análisis Numérico</span>} id="nav-capitulos-dropdown">
              {analisisNumericoData.map((cap) => (
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

            {/* ✅ Desplegable de Python */}
            <NavDropdown title={<span><i className="bi bi-filetype-py me-1"></i> Introducción a Python</span>} id="nav-python-dropdown">
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
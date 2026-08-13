import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
// ✅ Importación corregida con el nuevo nombre de la variable
import { analisisNumericoData, pythonData } from '../data/capitulosData';

function Home({ onSelectSection }) {
  return (
    <Container className="py-2">
      <div className="text-center mb-5">
        <h2 className="fw-bold text-navy">Bienvenido al Manual Interactivo</h2>
        <p className="lead text-muted">
          Recurso didáctico interactivo para la asignatura de Análisis Numérico — Facultad de Ingeniería, UNAM.
        </p>
        <hr className="w-25 mx-auto border-2 border-primary" />
      </div>

      <h4 className="fw-bold mb-4 text-secondary">
        <i className="bi bi-grid-fill me-2"></i>Unidades Temáticas del Curso de Análisis Numérico
      </h4>

      {/* Primer Grid: Recorre los capítulos usando analisisNumericoData */}
      <Row className="g-4">
        {analisisNumericoData.map((cap) => (
          <Col md={6} lg={4} key={cap.id}>
            <Card className="h-100 shadow-sm border-0 hover-card">
              <Card.Header className="bg-primary text-white d-flex align-items-center justify-content-between">
                <span className="fw-bold">Capítulo {cap.numero}</span>
                <i className={`bi ${cap.icon} fs-5`}></i>
              </Card.Header>
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fs-5 fw-bold mb-2">{cap.title}</Card.Title>
                <Card.Text className="text-muted fs-6 flex-grow-1">
                  {cap.descripcion}
                </Card.Text>
                <Button 
                  variant="outline-primary" 
                  className="mt-3 w-100 fw-bold"
                  onClick={() => onSelectSection(cap.id)}
                >
                  Explorar Capítulo <i className="bi bi-arrow-right ms-1"></i>
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <h4 className="fw-bold mb-4 text-secondary pt-5">
        <i className="bi bi-filetype-py me-2"></i>Introducción a Python para el manejo de Análisis Numérico
      </h4>

      {/* Segundo Grid: Recorre la lista de pythonData */}
      <Row className="g-4">
        {pythonData.map((py) => (
          <Col md={6} lg={4} key={py.id}>
            <Card className="h-100 shadow-sm border-0 hover-card">
              <Card.Header className="bg-success text-white d-flex align-items-center justify-content-between">
                <span className="fw-bold">Módulo {py.numero}</span>
                <i className={`bi ${py.icon} fs-5`}></i>
              </Card.Header>
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fs-5 fw-bold mb-2">{py.title}</Card.Title>
                <Card.Text className="text-muted fs-6 flex-grow-1">
                  {py.descripcion}
                </Card.Text>
                <Button 
                  variant="outline-success" 
                  className="mt-3 w-100 fw-bold"
                  onClick={() => onSelectSection(py.id)}
                >
                  Explorar Módulo <i className="bi bi-arrow-right ms-1"></i>
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

    </Container>
  );
}

export default Home;
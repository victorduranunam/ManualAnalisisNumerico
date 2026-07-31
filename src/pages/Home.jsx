import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { capitulosData } from '../data/capitulosData';

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
        <i className="bi bi-grid-fill me-2"></i>Unidades Temáticas del Curso
      </h4>

      {/* Grid de Cards de Bootstrap */}
      <Row className="g-4">
        {capitulosData.map((cap) => (
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
    </Container>
  );
}

export default Home;
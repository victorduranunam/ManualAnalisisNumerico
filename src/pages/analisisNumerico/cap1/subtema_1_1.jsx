import React, { useState } from 'react';
import { Container, Nav, Tab, Card } from 'react-bootstrap';

// Importación de las pestañas desde la subcarpeta modular
import FundamentosTab from './subtema_1_1_components/FundamentosTab';
import VideosTab from './subtema_1_1_components/VideosTab';
import SimuladorTab from './subtema_1_1_components/SimuladorTab';
import EjerciciosTab from './subtema_1_1_components/EjerciciosTab';
import CuestionarioTab from './subtema_1_1_components/CuestionarioTab';

export default function Subtema_1_1() {
  const [key, setKey] = useState('fundamentos');

  return (
    <Container fluid className="p-0">
      {/* 1. Encapsulamos todo en Tab.Container enviando activeKey y onSelect */}
      <Tab.Container activeKey={key} onSelect={(k) => setKey(k)}>
        <Card className="shadow-sm border-0">
          <Card.Header className="bg-white border-bottom-0 pt-3 px-4">
            <h4 className="fw-bold text-dark mb-3">1.1 Tipos de Errores</h4>
            
            {/* Barra de Navegación por Pestañas */}
            <Nav variant="tabs">
              <Nav.Item>
                <Nav.Link eventKey="fundamentos" className="fw-bold">
                  <i className="bi bi-book me-2 text-primary"></i>Fundamentos
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="videos" className="fw-bold">
                  <i className="bi bi-play-circle me-2 text-danger"></i>Videos de Apoyo
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="simulador" className="fw-bold">
                  <i className="bi bi-cpu me-2 text-success"></i>Simulador
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="ejercicios" className="fw-bold">
                  <i className="bi bi-pencil-square me-2 text-warning"></i>Ejercicios
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="cuestionario" className="fw-bold">
                  <i className="bi bi-check2-square me-2 text-info"></i>Cuestionario
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>

          <Card.Body className="p-4">
            {/* 2. Área de contenido dinámico */}
            <Tab.Content>
              <Tab.Pane eventKey="fundamentos">
                <FundamentosTab />
              </Tab.Pane>
              <Tab.Pane eventKey="videos">
                <VideosTab />
              </Tab.Pane>
              <Tab.Pane eventKey="simulador">
                <SimuladorTab />
              </Tab.Pane>
              <Tab.Pane eventKey="ejercicios">
                <EjerciciosTab />
              </Tab.Pane>
              <Tab.Pane eventKey="cuestionario">
                <CuestionarioTab />
              </Tab.Pane>
            </Tab.Content>
          </Card.Body>
        </Card>
      </Tab.Container>
    </Container>
  );
}
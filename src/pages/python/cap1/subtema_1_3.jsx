import React from "react";
import { Tab, Nav, Card } from "react-bootstrap";

// 1. IMPORTANTE: Aquí conectamos los componentes de las pestañas desde la subcarpeta
import FundamentosTab from "./subtema_1_3_components/FundamentosTab";
import VideosTab from "./subtema_1_3_components/VideosTab";
import SimuladorTab from "./subtema_1_3_components/SimuladorTab";
import EjerciciosTab from "./subtema_1_3_components/EjerciciosTab";
import CuestionarioTab from "./subtema_1_3_components/CuestionarioTab";

const Subtema1_3 = () => {
  return (
    <Card className="shadow-sm border-0 mb-4">
      <Card.Header className="bg-primary text-white">
        <h4 className="mb-0">
          1.3 Introducción a Python y su uso en el Análisis Numérico
        </h4>
      </Card.Header>

      <Card.Body>
        <Tab.Container id="subtema-1-3-tabs" defaultActiveKey="fundamentos">
          <Nav variant="tabs" className="mb-3">
            <Nav.Item>
              <Nav.Link eventKey="fundamentos">
                <i className="bi bi-book me-1"></i> Fundamentos
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="videos">
                <i className="bi bi-play-circle me-1"></i> Videos de Apoyo
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="simulador">
                <i className="bi bi-graph-up-arrow me-1"></i> Simulador
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="ejercicios">
                <i className="bi bi-journal-text me-1"></i> Ejercicios
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="cuestionario">
                <i className="bi bi-question-circle me-1"></i> Cuestionario
              </Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content>
            {/* 2. AQUÍ SE MUESTRA TU ARCHIVO FundamentosTab.jsx */}
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
        </Tab.Container>
      </Card.Body>
    </Card>
  );
};

export default Subtema1_3;
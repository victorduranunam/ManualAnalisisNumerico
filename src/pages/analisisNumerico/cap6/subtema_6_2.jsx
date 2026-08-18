import React from "react";
import { Tab, Nav, Card } from "react-bootstrap";


import FundamentosTab from "./subtema_6_2_components/FundamentosTab";
import VideosTab from "./subtema_6_2_components/VideosTab";
import SimuladorTab from "./subtema_6_2_components/SimuladorTab";
import EjerciciosTab from "./subtema_6_2_components/EjerciciosTab";
import CuestionarioTab from "./subtema_6_2_components/CuestionarioTab";

export const Subtema6_2 = () => {
  return (
    <Card className="shadow-sm border-0 mb-4">
      <Card.Header className="bg-primary text-white">
        <h4 className="mb-0">
          6.2 Importancia de los métodos numéricos en Ingeniería
        </h4>
      </Card.Header>

      <Card.Body>
        <Tab.Container id="subtema-6-2-tabs" defaultActiveKey="fundamentos">
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

export default Subtema6_2;
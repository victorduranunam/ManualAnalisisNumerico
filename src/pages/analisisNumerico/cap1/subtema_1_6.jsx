import React from "react";
import { Tab, Nav, Card } from "react-bootstrap";

import FundamentosTab from "./subtema_1_6_components/FundamentosTab";
import VideosTab from "./subtema_1_6_components/VideosTab";
import SimuladorTab from "./subtema_1_6_components/SimuladorTab";
import EjerciciosTab from "./subtema_1_6_components/EjerciciosTab";
import CuestionarioTab from "./subtema_1_6_components/CuestionarioTab";

const Subtema_1_6 = () => {
  return (
    <Card className="shadow-sm border-0 mb-4">
      <Card.Header className="bg-primary text-white">
        <h4 className="mb-0">1.6 - Teoría de Errores</h4>
      </Card.Header>

      <Card.Body>
        <Tab.Container id="subtema-1-6-tabs" defaultActiveKey="fundamentos">
          <Nav variant="tabs" className="mb-3 flex-wrap">
            <Nav.Item><Nav.Link eventKey="fundamentos">Fundamentos</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="videos">Videos de Apoyo</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="simulador">Simulador</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="ejercicios">Ejercicios</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="cuestionario">Cuestionario</Nav.Link></Nav.Item>
          </Nav>

          <Tab.Content>
            <Tab.Pane eventKey="fundamentos"><FundamentosTab /></Tab.Pane>
            <Tab.Pane eventKey="videos"><VideosTab /></Tab.Pane>
            <Tab.Pane eventKey="simulador"><SimuladorTab /></Tab.Pane>
            <Tab.Pane eventKey="ejercicios"><EjerciciosTab /></Tab.Pane>
            <Tab.Pane eventKey="cuestionario"><CuestionarioTab /></Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Card.Body>
    </Card>
  );
};

export default Subtema_1_6;

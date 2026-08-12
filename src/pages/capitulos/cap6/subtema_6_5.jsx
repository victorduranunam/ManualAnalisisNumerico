import React from "react";
import { Tab, Nav, Card } from "react-bootstrap";

import FundamentosTab from "./subtema_6_5_components/FundamentosTab";
import VideosTab from "./subtema_6_5_components/VideosTab";
import SimuladorTab from "./subtema_6_5_components/SimuladorTab";
import EjerciciosTab from "./subtema_6_5_components/EjerciciosTab";
import CuestionarioTab from "./subtema_6_5_components/CuestionarioTab";

const Subtema_6_5 = () => {
  return (
    <Card className="shadow-sm border-0 mb-4">
      <Card.Header className="bg-primary text-white">
        <h4 className="mb-0">6.5 - Ecuaciones Diferenciales</h4>
      </Card.Header>

      <Card.Body>
        <Tab.Container id="subtema-6-5-tabs" defaultActiveKey="fundamentos">
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

export default Subtema_6_5;

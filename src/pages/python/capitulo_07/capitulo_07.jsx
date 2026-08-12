import React from "react";
import { Tab, Nav, Card } from "react-bootstrap";

const CapituloPython_7 = () => (
  <Card className="shadow-sm border-0 mb-4">
    <Card.Header className="bg-success text-white">
      <h4 className="mb-0">Capítulo 7: Pandas y análisis de datos</h4>
    </Card.Header>
    <Card.Body>
      <Tab.Container id="python-capitulo-7-tabs" defaultActiveKey="fundamentos">
        <Nav variant="tabs" className="mb-3 flex-wrap">
          <Nav.Item><Nav.Link eventKey="fundamentos">Fundamentos</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link eventKey="videos">Videos</Nav.Link></Nav.Item>
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

export default CapituloPython_7;
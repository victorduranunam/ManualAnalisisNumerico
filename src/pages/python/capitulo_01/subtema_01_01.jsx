import React from 'react';
import { Tab, Nav, Card } from 'react-bootstrap';

import FundamentosTab from './subtema_01_01_components/FundamentosTab';
import VideosTab from './subtema_01_01_components/VideosTab';
import SimuladorTab from './subtema_01_01_components/SimuladorTab';
import EjerciciosTab from './subtema_01_01_components/EjerciciosTab';
import CuestionarioTab from './subtema_01_01_components/CuestionarioTab';

const SubtemaPython_1_1 = () => (
  <Card className="shadow-sm border-0 mb-4">
    <Card.Header className="bg-secondary text-white">
      <h5 className="mb-0">Subtema 1.1 - Introducción a Python</h5>
    </Card.Header>
    <Card.Body>
      <Tab.Container id="python-subtema-1-1-tabs" defaultActiveKey="fundamentos">
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

export default SubtemaPython_1_1;
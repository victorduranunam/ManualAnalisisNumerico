import React from 'react';
import { Tab, Nav, Card } from 'react-bootstrap';

import FundamentosTab from './capitulo_02_components/FundamentosTab';
import VideosTab from './capitulo_02_components/VideosTab';
import SimuladorTab from './capitulo_02_components/SimuladorTab';
import EjerciciosTab from './capitulo_02_components/EjerciciosTab';
import CuestionarioTab from './capitulo_02_components/CuestionarioTab';

const CapituloPython_2 = () => (
  <Card className="shadow-sm border-0 mb-4">
    <Card.Header className="bg-success text-white">
      <h4 className="mb-0">Capítulo 2: Colecciones y estructuras</h4>
    </Card.Header>
    <Card.Body>
      <Tab.Container id="python-capitulo-2-tabs" defaultActiveKey="fundamentos">
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

export default CapituloPython_2;
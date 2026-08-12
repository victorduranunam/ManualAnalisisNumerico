import React from "react";
import { Tab, Nav, Card } from "react-bootstrap";

const SubtemaPython_6_10 = () => (
  <Card className="shadow-sm border-0 mb-4">
    <Card.Header className="bg-secondary text-white">
      <h5 className="mb-0">Subtema 10 del capítulo 6</h5>
    </Card.Header>
    <Card.Body>
      <Tab.Container id="python-subtema-6-10-tabs" defaultActiveKey="fundamentos">
        <Nav variant="tabs" className="mb-3 flex-wrap">
          <Nav.Item><Nav.Link eventKey="fundamentos">Fundamentos</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link eventKey="videos">Videos</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link eventKey="simulador">Simulador</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link eventKey="ejercicios">Ejercicios</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link eventKey="cuestionario">Cuestionario</Nav.Link></Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="fundamentos"><div className="p-3 border rounded bg-light"><p className="text-muted mb-0">Fundamentos del subtema 10 del capítulo 6.</p></div></Tab.Pane>
          <Tab.Pane eventKey="videos"><div className="p-3 border rounded bg-light"><p className="text-muted mb-0">Videos del subtema 10 del capítulo 6.</p></div></Tab.Pane>
          <Tab.Pane eventKey="simulador"><div className="p-3 border rounded bg-light"><p className="text-muted mb-0">Simulador del subtema 10 del capítulo 6.</p></div></Tab.Pane>
          <Tab.Pane eventKey="ejercicios"><div className="p-3 border rounded bg-light"><p className="text-muted mb-0">Ejercicios del subtema 10 del capítulo 6.</p></div></Tab.Pane>
          <Tab.Pane eventKey="cuestionario"><div className="p-3 border rounded bg-light"><p className="text-muted mb-0">Cuestionario del subtema 10 del capítulo 6.</p></div></Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Card.Body>
  </Card>
);

export default SubtemaPython_6_10;
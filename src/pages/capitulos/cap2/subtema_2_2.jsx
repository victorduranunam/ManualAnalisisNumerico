import React, { useState } from 'react';
import { Tab, Tabs, Card } from 'react-bootstrap';

// 🔴 CAMBIA ESTO:
// function Subtema_2_2() {

// 🟢 POR ESTO:
export default function Subtema_2_2() {
  const [key, setKey] = useState('fundamentos');

  return (
    <Card className="shadow-sm border-0 p-3">
      <h3 className="fw-bold text-primary mb-3">2.2 Método de Regula Falsi</h3>
      
      <Tabs
        id="subtema-2-2-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="fundamentos" title="Fundamentos">
          <div className="p-3">Contenido de Fundamentos...</div>
        </Tab>
        <Tab eventKey="videos" title="Videos">
          <div className="p-3">Videos de apoyo...</div>
        </Tab>
        <Tab eventKey="simulador" title="Simulador">
          <div className="p-3">Simulador interactivo...</div>
        </Tab>
        <Tab eventKey="ejercicios" title="Ejercicios">
          <div className="p-3">Ejercicios...</div>
        </Tab>
        <Tab eventKey="cuestionario" title="Cuestionario">
          <div className="p-3">Cuestionario...</div>
        </Tab>
      </Tabs>
    </Card>
  );
}
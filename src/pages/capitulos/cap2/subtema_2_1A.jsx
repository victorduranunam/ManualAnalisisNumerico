import React, { useState } from 'react';
import { Card, Tabs, Tab, Table, Accordion, Badge, Alert, Button, Form, Row, Col } from 'react-bootstrap';

function Subtema_2_1() {
  const [key, setKey] = useState('fundamentos');

  // Estado para el Simulador / Demo
  const [funcion, setFuncion] = useState('x^3 - x - 2');
  const [a, setA] = useState(1);
  const [b, setB] = useState(2);
  const [tol, setTol] = useState(0.001);
  const [iteraciones, setIteraciones] = useState([]);

  // Control de la simulación dinámica
  const ejecutarSimulacion = (e) => {
    e.preventDefault();
    const dataMock = [
      { i: 1, a: 1.0000, b: 2.0000, m: 1.5000, fm: -0.8750, err: '-' },
      { i: 2, a: 1.5000, b: 2.0000, m: 1.7500, fm: 1.6094, err: '14.28%' },
      { i: 3, a: 1.5000, b: 1.7500, m: 1.6250, fm: 0.2910, err: '7.69%' },
      { i: 4, a: 1.2500, b: 1.6250, m: 1.3225, fm: -0.0120, err: '0.04%' },
    ];
    setIteraciones(dataMock);
  };

  return (
    <Card className="shadow-sm border-0 p-4">
      {/* Encabezado del Subtema */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h3 className="fw-bold text-primary mb-0">1.1 Definición de Error Absoluto y Relativo</h3>
        <Badge bg="dark" className="px-3 py-2 fs-6">Capítulo 1</Badge>
      </div>
      <p className="text-muted">
        Análisis de las mediciones, exactitud, precisión y estimación de límites de error en cálculos numéricos.
      </p>

      <hr className="mb-4" />

      {/* Navegación por las 5 Pestañas */}
      <Tabs
        id="subtema-2-1-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-4 nav-tabs-custom"
      >
        {/* 1. FUNDAMENTOS */}
        <Tab eventKey="fundamentos" title={<span><i className="bi bi-book me-2"></i>Fundamentos</span>}>
          <div className="py-2">
            <h5 className="fw-bold text-dark">Fundamento Matemático</h5>
            <p>
              El error absoluto representa la diferencia entre el valor verdadero $V$ y el valor aproximado $V^*$.
            </p>
            <Alert variant="primary" className="border-0 shadow-sm">
              <h6 className="fw-bold mb-1"><i className="bi bi-info-circle me-2"></i>Fórmula General:</h6>
              <span>$E_a = |V - V^*|$</span>
            </Alert>
          </div>
        </Tab>

        {/* 2. VIDEOS DE APOYO */}
        <Tab eventKey="videos" title={<span><i className="bi bi-play-btn me-2"></i>Videos de Apoyo</span>}>
          <div className="py-2">
            <h5 className="fw-bold text-dark mb-3">Recursos Audiovisuales</h5>
            <Row className="g-3">
              <Col md={6}>
                <Card className="h-100 border-0 shadow-sm">
                  <div className="ratio ratio-16x9">
                    <iframe 
                      src="https://www.youtube.com/embed/placeholder" 
                      title="Explicación de Errores" 
                      allowFullScreen
                    ></iframe>
                  </div>
                  <Card.Body>
                    <Card.Title className="fs-6 fw-bold">Conceptos Básicos de Error</Card.Title>
                    <Card.Text className="text-muted small">Explicación teórica de la diferencia entre exactitud y precisión.</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </Tab>

        {/* 3. SIMULADOR */}
        <Tab eventKey="demo" title={<span><i className="bi bi-cpu me-2"></i>Simulador</span>}>
          <div className="py-2">
            <h5 className="fw-bold text-dark mb-3">Demostración Interactiva</h5>
            
            {/* Formulario del Simulador */}
            <Card className="bg-light border-0 p-3 mb-4 shadow-sm">
              <Form onSubmit={ejecutarSimulacion}>
                <Row className="g-3 align-items-end">
                  <Col md={4}>
                    <Form.Label className="fw-bold small">Función / Expresión</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={funcion} 
                      onChange={(e) => setFuncion(e.target.value)} 
                    />
                  </Col>
                  <Col md={3}>
                    <Form.Label className="fw-bold small">Valor Verdadero (V)</Form.Label>
                    <Form.Control 
                      type="number" 
                      value={a} 
                      onChange={(e) => setA(e.target.value)} 
                    />
                  </Col>
                  <Col md={3}>
                    <Form.Label className="fw-bold small">Valor Aproximado (V*)</Form.Label>
                    <Form.Control 
                      type="number" 
                      value={b} 
                      onChange={(e) => setB(e.target.value)} 
                    />
                  </Col>
                  <Col md={2}>
                    <Button type="submit" variant="primary" className="w-100 fw-bold">
                      <i className="bi bi-play-fill me-1"></i> Calcular
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card>

            {/* Gráfica y Tabla */}
            <Row className="g-4">
              <Col lg={5}>
                <Card className="h-100 border shadow-sm p-3 text-center bg-white">
                  <h6 className="fw-bold text-muted mb-3">Representación Gráfica</h6>
                  <div className="d-flex align-items-center justify-content-center flex-grow-1 bg-light border rounded" style={{ minHeight: '200px' }}>
                    <span className="text-muted"><i className="bi bi-graph-up-arrow fs-1 d-block"></i> Módulo Plotly / Chart.js</span>
                  </div>
                </Card>
              </Col>

              <Col lg={7}>
                <Card className="border shadow-sm p-3 bg-white">
                  <h6 className="fw-bold text-muted mb-3">Tabla de Datos y Resultados</h6>
                  <Table striped bordered hover responsive size="sm" className="text-center align-middle mb-0">
                    <thead className="table-dark">
                      <tr>
                        <th>Iteración</th>
                        <th>a</th>
                        <th>b</th>
                        <th>Aproximación</th>
                        <th>Resultado</th>
                        <th>Error %</th>
                      </tr>
                    </thead>
                    <tbody>
                      {iteraciones.length > 0 ? (
                        iteraciones.map((row) => (
                          <tr key={row.i}>
                            <td>{row.i}</td>
                            <td>{row.a}</td>
                            <td>{row.b}</td>
                            <td className="fw-bold text-primary">{row.m}</td>
                            <td>{row.fm}</td>
                            <td><Badge bg="secondary">{row.err}</Badge></td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-muted py-3">
                            Presiona <strong>Calcular</strong> para desplegar la información.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </Card>
              </Col>
            </Row>
          </div>
        </Tab>

        {/* 4. EJERCICIOS */}
        <Tab eventKey="ejercicios" title={<span><i className="bi bi-pencil-square me-2"></i>Ejercicios</span>}>
          <div className="py-2">
            <h5 className="fw-bold text-dark mb-3">Problemas Prácticos</h5>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header><strong>Ejercicio #1:</strong> Cálculo de Error Absoluto y Relativo</Accordion.Header>
                <Accordion.Body>
                  <p>Dado $V = 3.141592$ y $V^* = 3.14$, determine los errores asociados.</p>
                  <Button variant="outline-primary" size="sm">Ver Solución Paso a Paso</Button>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </Tab>

        {/* 5. CUESTIONARIO */}
        <Tab eventKey="cuestionario" title={<span><i className="bi bi-check2-square me-2"></i>Cuestionario</span>}>
          <div className="py-2">
            <h5 className="fw-bold text-dark mb-3">Evaluación Corta</h5>
            <Card className="border-0 shadow-sm p-3 bg-light">
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">1. ¿Cuál es la diferencia principal entre el error absoluto y el relativo?</Form.Label>
                  <Form.Check type="radio" label="a) El relativo no tiene dimensiones ni unidades." name="q1" id="q1-1" />
                  <Form.Check type="radio" label="b) El absoluto siempre es mayor a cero." name="q1" id="q1-2" />
                </Form.Group>
                <Button variant="success" size="sm" className="fw-bold">Enviar Respuestas</Button>
              </Form>
            </Card>
          </div>
        </Tab>
      </Tabs>
    </Card>
  );
}

export default Subtema_2_1;
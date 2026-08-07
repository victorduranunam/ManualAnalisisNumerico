import React from "react";
import { Row, Col, Card } from "react-bootstrap";

const VideosTab = () => {
  return (
    <div>
      <h5 className="text-primary mb-3">Material Audiovisual</h5>
      <p className="text-muted">
        Consulta las explicaciones en video sobre la implementación y deducción de los métodos de búsqueda incremental y bisección.
      </p>

      <Row className="g-4">
        {/* Video 1 */}
        <Col md={6}>
          <Card className="h-100 border-0 shadow-sm">
            <div className="ratio ratio-16x9 border-top-radius">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Deducción del Método de Bisección"
                allowFullScreen
              ></iframe>
            </div>
            <Card.Body>
              <Card.Title className="h6">1. Deducción Gráfica y Teorema de Bolzano</Card.Title>
              <Card.Text className="small text-muted">
                Explicación de las condiciones necesarias de continuidad y cambio de signo.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Video 2 */}
        <Col md={6}>
          <Card className="h-100 border-0 shadow-sm">
            <div className="ratio ratio-16x9 border-top-radius">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Ejemplo Práctico de Bisección"
                allowFullScreen
              ></iframe>
            </div>
            <Card.Body>
              <Card.Title className="h6">2. Algoritmo de Bisección en Código</Card.Title>
              <Card.Text className="small text-muted">
                Paso a paso de la implementación numérica y análisis de convergencia.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};


export default VideosTab;
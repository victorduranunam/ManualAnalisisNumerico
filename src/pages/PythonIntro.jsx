import React, { useState } from 'react';
import { Container, Row, Col, Card, ListGroup, Badge, Button } from 'react-bootstrap';
import { pythonData } from '../data/capitulosData';

// Carga dinámica (eager) de subtemas de Python
const pythonCapModules = import.meta.glob('./python/**/subtema_*.jsx', { eager: true });

function PythonIntro() {
  const [activeCapitulo, setActiveCapitulo] = useState('py_cap1');
  const [activeSubtema, setActiveSubtema] = useState('py_1.1');

  const capitulo = pythonData.find((c) => c.id === activeCapitulo);

  const renderContenido = () => {
    if (!capitulo) return null;

    // Buscar el subtema específico en los datos
    const subtemaActual = capitulo.subtemas?.find((sub) => sub.id === activeSubtema);
    
    if (subtemaActual) {
      try {
        // activeSubtema es "py_1.1" → extraer solo subNum
        const parts = String(activeSubtema).split('_');
        const subParts = parts[1].split('.');
        const subNum = String(subParts[1] || '1').padStart(2, '0');
        
        // Usar capitulo.numero (con leading zeros porque Python lo requiere)
        const capNum = String(capitulo.numero).padStart(2, '0');
        
        // Construir ruta: ./python/capitulo_01/subtema_01_01.jsx
        const relPath = `./python/capitulo_${capNum}/subtema_${capNum}_${subNum}.jsx`;
        const mod = pythonCapModules[relPath];
        
        if (mod && mod.default) {
          const Component = mod.default;
          return <Component />;
        }
      } catch (e) {
        console.error('Error al cargar subtema:', e);
      }
    }

    // Fallback genérico
    return (
      <Card className="p-4 shadow-sm border-0">
        <h5 className="text-muted">Subtema en desarrollo</h5>
        <p className="text-muted mb-0">El contenido de este subtema está siendo preparado.</p>
      </Card>
    );
  };

  return (
    <Container fluid className="py-3">
      <Row className="g-4">
        {/* SIDEBAR */}
        <Col md={3}>
          <Card className="shadow-sm border-0 sticky-top" style={{ top: '80px' }}>
            <Card.Header className="bg-success text-white fw-bold">
              <i className="bi bi-code-square me-2"></i>Python
            </Card.Header>
            <ListGroup variant="flush">
              {pythonData.map((cap) => (
                <ListGroup.Item
                  key={cap.id}
                  action
                  active={activeCapitulo === cap.id}
                  onClick={() => {
                    setActiveCapitulo(cap.id);
                    setActiveSubtema(`py_${cap.numero}.1`);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <strong>{cap.title}</strong>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>

        {/* CONTENIDO PRINCIPAL */}
        <Col md={9}>
          {capitulo && (
            <>
              <Card className="shadow-sm border-0 mb-4">
                <Card.Header className="bg-success text-white">
                  <h4 className="mb-0">{capitulo.title}</h4>
                </Card.Header>
                <Card.Body>
                  <p className="text-muted">{capitulo.descripcion}</p>
                </Card.Body>
              </Card>

              {/* Lista de subtemas */}
              <div className="mb-4">
                <h5 className="fw-bold mb-3">Subtemas de {capitulo.title}</h5>
                <div className="d-flex flex-wrap gap-2">
                  {capitulo.subtemas?.map((sub) => (
                    <Button
                      key={sub.id}
                      variant={activeSubtema === sub.id ? 'success' : 'outline-success'}
                      onClick={() => setActiveSubtema(sub.id)}
                      size="sm"
                      className="fw-bold"
                    >
                      {sub.title.split(' ')[0]}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Renderizar contenido del subtema */}
              {renderContenido()}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default PythonIntro;
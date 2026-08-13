import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, ListGroup, Badge, Button } from "react-bootstrap";
import SubtemaSkeleton from "./analisisNumerico/SubtemaSkeleton";

// Carga dinámica de módulos usando Vite
const analisisModules = import.meta.glob("./analisisNumerico/cap*/subtema_*.jsx", { eager: true });
const pythonModules = import.meta.glob("./python/cap*/subtema_*.jsx", { eager: true });

function ModuloView({ capitulo }) {
  const [activeSubtema, setActiveSubtema] = useState("general");

  // Reset a la vista general al cambiar de capítulo en el menú
  useEffect(() => {
    setActiveSubtema("general");
  }, [capitulo?.id]);

  if (!capitulo) return null;

  // Identifica si es bloque de Python o de Análisis Numérico
  const esPython = String(capitulo.id).startsWith("py_");
  const modulesGroup = esPython ? pythonModules : analisisModules;
  const folderName = esPython ? "python" : "analisisNumerico";
  const themeColor = esPython ? "success" : "primary";

  const renderContenido = () => {
    // Portada / Vista general del capítulo
    if (activeSubtema === "general") {
      return (
        <CapituloGeneralView 
          capitulo={capitulo} 
          onSelectSubtema={setActiveSubtema} 
          themeColor={themeColor} 
        />
      );
    }

    // Carga dinámica del subtema seleccionado
    const subtemaActual = capitulo.subtemas?.find((sub) => sub.id === activeSubtema);
    
    if (subtemaActual) {
      try {
        const cleanId = String(activeSubtema).replace('py_', '');
        const subNum = cleanId.includes('.') ? cleanId.split('.')[1] : cleanId;

        // Ruta relativa exacta mapeada por Vite
        const relPath = `./${folderName}/cap${capitulo.numero}/subtema_${capitulo.numero}_${subNum}.jsx`;

        const mod = modulesGroup[relPath];

        if (mod && mod.default) {
          const Specific = mod.default;
          return <Specific />;
        }
      } catch (e) {
        console.error("Error al cargar subtema:", e);
      }

      // Componente de respaldo si no coincide la ruta
      return <SubtemaSkeleton capitulo={capitulo} subtemaId={activeSubtema} />;
    }

    return (
      <Card className="p-4 shadow-sm border-0 text-center">
        <h5 className="text-warning fw-bold mb-2">Subtema en desarrollo</h5>
        <p className="text-muted mb-0">
          El subtema <code>"{activeSubtema}"</code> aún no está definido.
        </p>
      </Card>
    );
  };

  return (
    <Container fluid className="py-3">
      <Row className="g-4">
        {/* SIDEBAR DE NAVEGACIÓN LATERAL */}
        <Col md={3}>
          <Card className="shadow-sm border-0 sticky-top" style={{ top: "80px" }}>
            <Card.Header className={`bg-${themeColor} text-white fw-bold d-flex justify-content-between align-items-center`}>
              <span>{capitulo.title}</span>
              <Badge bg="warning" text="dark">Cap. {capitulo.numero}</Badge>
            </Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item
                action
                active={activeSubtema === "general"}
                onClick={() => setActiveSubtema("general")}
                className="fw-bold text-dark d-flex align-items-center"
                style={{ cursor: "pointer" }}
              >
                <i className={`bi bi-info-circle-fill me-2 text-${themeColor}`}></i>
                Vista General del Capítulo
              </ListGroup.Item>

              <div className="border-top my-1"></div>

              {capitulo.subtemas?.map((sub) => (
                <ListGroup.Item
                  key={sub.id}
                  action
                  active={activeSubtema === sub.id}
                  onClick={() => setActiveSubtema(sub.id)}
                  className="ps-4"
                  style={{ cursor: "pointer" }}
                >
                  <small>{sub.title}</small>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>

        {/* ÁREA DE CONTENIDO */}
        <Col md={9}>
          {renderContenido()}
        </Col>
      </Row>
    </Container>
  );
}

// PORTADA Y VISTA GENERAL DEL CAPÍTULO
function CapituloGeneralView({ capitulo, onSelectSubtema, themeColor }) {
  return (
    <Card className="shadow-sm border-0 p-4">
      <div className="border-bottom pb-3 mb-4">
        <Badge bg={themeColor} className="mb-2 px-3 py-2 fs-6">
          Capítulo {capitulo.numero}
        </Badge>
        <h2 className="fw-bold text-dark">{capitulo.title}</h2>
        <p className="lead text-muted mb-0">{capitulo.descripcion}</p>
      </div>

      <Row className="g-4 mb-4">
        <Col md={6}>
          <Card className="h-100 bg-light border-0 p-3">
            <h5 className={`fw-bold text-${themeColor} mb-3`}>
              <i className="bi bi-target me-2"></i>Objetivos de Aprendizaje
            </h5>
            <ul className="lh-lg mb-0 text-secondary">
              {capitulo.objetivos?.map((obj, i) => (
                <li key={i}>{obj}</li>
              )) || <li>Comprender los fundamentos analíticos y computacionales del tema.</li>}
            </ul>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="h-100 bg-light border-0 p-3">
            <h5 className={`fw-bold text-${themeColor} mb-3`}>
              <i className="bi bi-book me-2"></i>Conocimientos Previos
            </h5>
            <ul className="lh-lg mb-0 text-secondary">
              {capitulo.prerrequisitos?.map((req, i) => (
                <li key={i}>{req}</li>
              )) || <li>Cálculo Diferencial e Integral, Programación básica en Python.</li>}
            </ul>
          </Card>
        </Col>
      </Row>

      <h5 className="fw-bold text-dark mb-3">
        <i className="bi bi-list-task me-2"></i>Subtemas de esta Unidad
      </h5>

      <ListGroup variant="flush" className="border rounded shadow-sm">
        {capitulo.subtemas?.map((sub) => (
          <ListGroup.Item
            key={sub.id}
            className="d-flex justify-content-between align-items-center py-3"
          >
            <div>
              <h6 className="fw-bold mb-1">{sub.title}</h6>
              <small className="text-muted">
                Fundamentos, Videos de Apoyo, Simulador, Ejercicios y Cuestionario.
              </small>
            </div>
            <Button
              variant={`outline-${themeColor}`}
              size="sm"
              className="fw-bold"
              onClick={() => onSelectSubtema(sub.id)}
            >
              Estudiar Tema &rarr;
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
}

export default ModuloView;
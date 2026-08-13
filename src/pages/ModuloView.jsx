import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, ListGroup, Badge, Button, Form } from "react-bootstrap";
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

  // Manejador de selección con scroll automático para móviles
  const handleSelectSubtema = (subId) => {
    setActiveSubtema(subId);
    
    // Si estamos en pantalla móvil (< 768px), desplaza suavemente hacia el contenido
    if (window.innerWidth < 768) {
      const contentArea = document.getElementById("area-contenido-subtema");
      if (contentArea) {
        contentArea.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const renderContenido = () => {
    // Portada / Vista general del capítulo
    if (activeSubtema === "general") {
      return (
        <CapituloGeneralView 
          capitulo={capitulo} 
          onSelectSubtema={handleSelectSubtema} 
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
      
      {/* 📱 NAVEGACIÓN COMPACTA EN MÓVILES (Visible únicamente en pantalla chica < md) */}
      <div className="d-block d-md-none mb-3">
        <Card className="shadow-sm border-0">
          <Card.Body className="p-3">
            <Form.Group>
              <Form.Label className="fw-bold text-dark small mb-2">
                <i className={`bi bi-journal-bookmark-fill me-2 text-${themeColor}`}></i>
                Navegar en Capítulo {capitulo.numero}:
              </Form.Label>
              <Form.Select 
                value={activeSubtema} 
                onChange={(e) => handleSelectSubtema(e.target.value)}
                className="fw-bold border-secondary"
              >
                <option value="general">📋 Vista General del Capítulo</option>
                {capitulo.subtemas?.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    📌 {sub.title}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Card.Body>
        </Card>
      </div>

      <Row className="g-4">
        {/* 💻 SIDEBAR DE NAVEGACIÓN EN ESCRITORIO (Oculta en móviles, visible desde md) */}
        <Col md={3} className="d-none d-md-block">
          <Card className="shadow-sm border-0 sticky-top" style={{ top: "80px" }}>
            <Card.Header className={`bg-${themeColor} text-white fw-bold d-flex justify-content-between align-items-center`}>
              <span>{capitulo.title}</span>
              <Badge bg="warning" text="dark">Cap. {capitulo.numero}</Badge>
            </Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item
                action
                active={activeSubtema === "general"}
                onClick={() => handleSelectSubtema("general")}
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
                  onClick={() => handleSelectSubtema(sub.id)}
                  className="ps-4"
                  style={{ cursor: "pointer" }}
                >
                  <small>{sub.title}</small>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>

        {/* ÁREA DE CONTENIDO (Identificada con id para el auto-scroll) */}
        <Col xs={12} md={9} id="area-contenido-subtema">
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
              <small className="text-muted d-none d-sm-block">
                Fundamentos, Videos de Apoyo, Simulador, Ejercicios y Cuestionario.
              </small>
            </div>
            <Button
              variant={`outline-${themeColor}`}
              size="sm"
              className="fw-bold ms-2"
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
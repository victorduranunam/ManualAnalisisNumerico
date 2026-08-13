import React from "react";
import { Tab, Nav, Card } from "react-bootstrap";

const placeholderTabs = [
  { key: "fundamentos", title: "Fundamentos", icon: "bi-book-half" },
  { key: "videos", title: "Videos de Apoyo", icon: "bi-play-circle" },
  { key: "simulador", title: "Simulador", icon: "bi-graph-up-arrow" },
  { key: "ejercicios", title: "Ejercicios", icon: "bi-journal-text" },
  { key: "cuestionario", title: "Cuestionario", icon: "bi-question-circle" },
];

const PlaceholderPanel = ({ title, icon, description }) => (
  <div className="border rounded p-4 bg-light">
    <h5 className="text-primary fw-bold mb-3">
      <i className={`bi ${icon} me-2`}></i>
      {title}
    </h5>
    <p className="text-muted mb-0">{description}</p>
  </div>
);

const SubtemaSkeleton = ({ capitulo, subtemaId }) => {
  const subtema = capitulo?.subtemas?.find((item) => item.id === subtemaId) || {
    id: subtemaId,
    title: `Subtema ${subtemaId}`,
  };

  return (
    <Card className="shadow-sm border-0 mb-4">
      <Card.Header className="bg-primary text-white">
        <h4 className="mb-0">
          {subtema.id} - {subtema.title}
        </h4>
      </Card.Header>

      <Card.Body>
        <Tab.Container id={`subtema-${subtema.id}-tabs`} defaultActiveKey="fundamentos">
          <Nav variant="tabs" className="mb-3 flex-wrap">
            {placeholderTabs.map((tab) => (
              <Nav.Item key={tab.key}>
                <Nav.Link eventKey={tab.key}>
                  <i className={`bi ${tab.icon} me-2`}></i>
                  {tab.title}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>

          <Tab.Content>
            <Tab.Pane eventKey="fundamentos">
              <PlaceholderPanel
                title="Fundamentos del subcapítulo"
                icon="bi-book-half"
                description={`Aquí va la teoría del ${subtema.id} (${subtema.title}) del capítulo ${capitulo?.numero || ""}.`}
              />
            </Tab.Pane>

            <Tab.Pane eventKey="videos">
              <PlaceholderPanel
                title="Videos de apoyo"
                icon="bi-play-circle"
                description="Aquí se agregan los videos explicativos del subcapítulo cuando estén listos."
              />
            </Tab.Pane>

            <Tab.Pane eventKey="simulador">
              <PlaceholderPanel
                title="Simulador"
                icon="bi-graph-up-arrow"
                description="Espacio para graficar, iteraciones y resultados del método del subcapítulo."
              />
            </Tab.Pane>

            <Tab.Pane eventKey="ejercicios">
              <PlaceholderPanel
                title="Ejercicios"
                icon="bi-journal-text"
                description="Aquí se escriben los enunciados, soluciones y ejercicios del subcapítulo."
              />
            </Tab.Pane>

            <Tab.Pane eventKey="cuestionario">
              <PlaceholderPanel
                title="Cuestionario"
                icon="bi-question-circle"
                description="Aquí se arma la autoevaluación con preguntas y retroalimentación del tema."
              />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Card.Body>
    </Card>
  );
};

export default SubtemaSkeleton;

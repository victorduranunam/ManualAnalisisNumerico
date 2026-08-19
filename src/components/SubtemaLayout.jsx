import React, { useId } from 'react';
import { Tab, Nav, Card } from 'react-bootstrap';

export const SubtemaLayout = ({
  titulo,
  headerBg = 'primary',
  fundamentos,
  videos,
  simulador,
  ejercicios,
  cuestionario,
  pestanasAdicionales = []
}) => {
  // Genera un ID único y seguro para React, sin importar si el título es un string o JSX
  const defaultId = useId().replace(/:/g, ''); 
  
  const tabId = typeof titulo === 'string' 
    ? `subtema-tabs-${titulo.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`
    : `subtema-tabs-${defaultId}`;

  // Lista de pestañas estándar
  const tabsEstandar = [
    { key: 'fundamentos', label: 'Fundamentos', icon: 'bi-book', component: fundamentos },
    { key: 'videos', label: 'Videos de Apoyo', icon: 'bi-play-circle', component: videos },
    { key: 'simulador', label: 'Simulador', icon: 'bi-graph-up-arrow', component: simulador },
    { key: 'ejercicios', label: 'Ejercicios', icon: 'bi-journal-text', component: ejercicios },
    { key: 'cuestionario', label: 'Cuestionario', icon: 'bi-question-circle', component: cuestionario },
  ];

  // Combina las pestañas estándar con las adicionales y remueve las vacías
  const tabs = [...tabsEstandar, ...pestanasAdicionales].filter(
    (tab) => Boolean(tab.component)
  );

  if (tabs.length === 0) return null;

  return (
    <Card className="shadow-sm border-0 mb-4">
      <Card.Header className={`bg-${headerBg} text-white`}>
        <h4 className="mb-0">{titulo}</h4>
      </Card.Header>

      <Card.Body>
        <Tab.Container id={tabId} defaultActiveKey={tabs[0].key}>
          <Nav variant="tabs" className="mb-3 flex-wrap">
            {tabs.map((tab) => (
              <Nav.Item key={tab.key}>
                <Nav.Link eventKey={tab.key}>
                  <i className={`bi ${tab.icon || 'bi-star'} me-1`}></i> {tab.label}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>

          <Tab.Content>
            {tabs.map((tab) => (
              <Tab.Pane key={tab.key} eventKey={tab.key}>
                {tab.component}
              </Tab.Pane>
            ))}
          </Tab.Content>
        </Tab.Container>
      </Card.Body>
    </Card>
  );
};

export default SubtemaLayout;
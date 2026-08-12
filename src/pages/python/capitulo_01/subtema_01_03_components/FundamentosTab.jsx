import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const FundamentosTab = () => (
  <Card className="border-0 shadow-sm">
    <Card.Body>
      <h5 className="text-primary fw-bold mb-4">Aplicación en el Análisis Numérico</h5>
      
      <p>
        La fortaleza de Python en el análisis numérico radica en su capacidad para incorporar bibliotecas desarrolladas 
        por una amplia comunidad de investigadores y programadores. Estas herramientas proporcionan funciones optimizadas 
        para realizar cálculos matemáticos, operaciones matriciales, álgebra lineal, optimización, integración numérica 
        y visualización de resultados, evitando la necesidad de programar algoritmos de alta complejidad desde cero.
      </p>

      <h6 className="text-secondary fw-bold mt-4 mb-3">Bibliotecas principales</h6>
      <p>
        Entre las bibliotecas más utilizadas destaca <strong>NumPy</strong>, pilar fundamental del cálculo científico. 
        Esta librería permite trabajar de manera eficiente con arreglos multidimensionales y matrices, ofreciendo una 
        sintaxis cercana a la de entornos como MATLAB, lo que facilita la transición a los estudiantes.
      </p>

      <p className="fw-bold text-secondary mb-2">Otras bibliotecas esenciales son:</p>
      <ListGroup variant="flush" className="mb-3">
        <ListGroup.Item className="border-0 ps-0">
          <strong>SciPy:</strong> orientada a métodos numéricos y cálculo científico avanzado.
        </ListGroup.Item>
        <ListGroup.Item className="border-0 ps-0">
          <strong>Matplotlib:</strong> dedicada a la generación de gráficos y visualización de datos.
        </ListGroup.Item>
        <ListGroup.Item className="border-0 ps-0">
          <strong>Pandas:</strong> especializada en la manipulación y procesamiento de estructuras de datos.
        </ListGroup.Item>
      </ListGroup>

      <p>
        Gracias a este ecosistema, la adopción de Python en universidades, centros de investigación y empresas 
        tecnológicas lo ha consolidado como el estándar para la implementación de métodos numéricos en ingeniería 
        y ciencias aplicadas.
      </p>

      <p className="text-muted mt-3 mb-0">
        A lo largo de este manual, el objetivo no será dominar el lenguaje a nivel experto, sino utilizarlo como una 
        herramienta práctica para comprender, analizar e implementar los procedimientos matemáticos estudiados, 
        facilitando su aplicación en la solución de problemas reales.
      </p>
    </Card.Body>
  </Card>
);

export default FundamentosTab;

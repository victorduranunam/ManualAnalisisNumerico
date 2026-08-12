import React from 'react';
import { Card } from 'react-bootstrap';

const FundamentosTab = () => (
  <Card className="border-0 shadow-sm">
    <Card.Body>
      <h5 className="text-primary fw-bold mb-4">Principios del desarrollo de programas en Python</h5>
      
      <p>
        Con el crecimiento de la comunidad de desarrolladores, fue necesario establecer principios que garantizaran 
        que la evolución del lenguaje conservara su sencillez y facilidad de uso. Estos principios, que dieron origen 
        a la filosofía de Python, se resumen en las siguientes características:
      </p>

      <ul className="lh-lg text-secondary">
        <li>
          <strong>Ser intuitivo y accesible</strong>, sin sacrificar potencia ni flexibilidad.
        </li>
        <li>
          <strong>Mantener una sintaxis clara</strong>, facilitando la lectura y el mantenimiento del código.
        </li>
        <li>
          <strong>Permanecer como software libre y de código abierto</strong>, permitiendo la colaboración global.
        </li>
        <li>
          <strong>Favorecer el desarrollo rápido</strong> de programas y prototipos para resolver problemas científicos, 
          técnicos y cotidianos.
        </li>
      </ul>

      <p className="text-muted mt-3 mb-0">
        Estos principios fundamentales han permitido que Python sea adoptado ampliamente en la comunidad académica y 
        profesional para la solución de problemas complejos en análisis numérico y computación científica.
      </p>
    </Card.Body>
  </Card>
);

export default FundamentosTab;

import React from 'react';
import { Card } from 'react-bootstrap';

const FundamentosTab = () => (
  <Card className="border-0 shadow-sm">
    <Card.Body>
      <h5 className="text-primary fw-bold mb-4">Introducción a Python y su uso en el Análisis Numérico</h5>
      
      <p className="lead mb-3">
        <strong>Hola Master Durán</strong>
      </p>

      <p>
        Python es un lenguaje de programación de alto nivel, interpretado y de código abierto (<em>Open Source</em>). 
        Una de sus principales ventajas es que es multiplataforma, lo que permite ejecutar un mismo programa en 
        diferentes sistemas operativos como Windows, macOS y Linux.
      </p>

      <p>
        Gracias a su sintaxis sencilla y fácil de comprender, Python se ha convertido en uno de los lenguajes de 
        programación más utilizados en la actualidad. Su facilidad de aprendizaje permite que el usuario dedique más 
        tiempo a la resolución de problemas que a la complejidad propia de la sintaxis. Por esta razón, en este manual 
        interactivo se utilizará Python como herramienta principal para implementar los métodos del análisis numérico 
        desarrollados en cada capítulo.
      </p>

      <h6 className="text-secondary fw-bold mt-4 mb-2">Historia de Python</h6>
      <p>
        Este lenguaje fue creado por Guido van Rossum en los Países Bajos. Van Rossum, licenciado en matemáticas y 
        computación, desarrolló Python como un proyecto personal durante las vacaciones navideñas de 1989, basándose 
        en el lenguaje ABC, y presentó la primera versión a sus colegas a principios de 1991. El nombre del lenguaje 
        proviene de uno de sus programas de televisión favoritos: <em>Monty Python's Flying Circus</em>.
      </p>
    </Card.Body>
  </Card>
);

export default FundamentosTab;

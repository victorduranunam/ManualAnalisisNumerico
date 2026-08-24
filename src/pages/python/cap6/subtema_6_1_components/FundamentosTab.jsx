import React from "react";

const FundamentosTab = () => (
  <div className="p-4 border rounded bg-light shadow-sm">
    <h4 className="text-primary fw-bold mb-3">6.1 Bloques de código e indentación</h4>
    
    <p className="text-secondary leading-relaxed">
      En un programa es común que varias instrucciones se agrupen para realizar una misma tarea. A este conjunto de instrucciones se le conoce como <strong>bloque de código</strong>.
    </p>

    <p className="text-secondary leading-relaxed">
      Para indicar qué instrucciones pertenecen a un mismo bloque, Python utiliza la <strong>indentación o sangría</strong>, que consiste en desplazar hacia la derecha las líneas de código que forman parte de dicho bloque. A diferencia de otros lenguajes de programación, Python no emplea llaves (<code>{"{}"}</code>) ni palabras especiales para delimitar el inicio y el final de un bloque.
    </p>

    <p className="text-secondary leading-relaxed">
      La indentación no solo mejora la legibilidad del código, sino que también forma parte de la sintaxis del lenguaje. Por ello, todas las instrucciones que pertenezcan al mismo bloque deben mantener el mismo nivel de indentación. Aunque se recomienda utilizar cuatro espacios para cada nivel, lo importante es que se mantenga una sangría uniforme.
    </p>

    <div className="card mb-3 border-0 bg-white shadow-sm p-3">
      <h5 className="text-dark fw-bold mb-3">Elementos de un bloque de código</h5>
      <p className="text-muted mb-2">Todo bloque de código en Python se identifica por tres elementos:</p>
      <ul>
        <li><strong>Los dos puntos (<code>:</code>):</strong> indican el inicio de un nuevo bloque de instrucciones.</li>
        <li><strong>La indentación:</strong> todas las instrucciones del bloque deben tener el mismo nivel de sangría.</li>
        <li><strong>El fin del bloque:</strong> ocurre cuando una instrucción regresa al mismo nivel de indentación donde comenzó el bloque.</li>
      </ul>

      <pre className="bg-dark text-white p-3 font-monospace rounded mb-0">
<code>{`# Estructura general de un bloque:
Inicio del bloque:
    Instrucción 1
    Instrucción 2
    Instrucción 3
Fin del bloque al romper la indentación`}</code>
      </pre>
    </div>

    <div className="alert alert-danger mb-0">
      <h6 className="fw-bold mb-1">⚠️ Error común (IndentationError):</h6>
      <p className="mb-0 small">
        Nunca combines tabuladores y espacios en blanco en el mismo archivo. Configura tu editor (como VS Code) para que la tecla Tab inserte automáticamente 4 espacios.
      </p>
    </div>
  </div>
);

export default FundamentosTab;
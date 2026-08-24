import React from "react";

const FundamentosTab = () => (
  <div className="p-4 border rounded bg-light shadow-sm">
    <h4 className="text-primary fw-bold mb-3">4.8 Diccionarios</h4>
    
    <p className="text-secondary leading-relaxed">
      Los diccionarios son estructuras que permiten almacenar información mediante una relación entre una <strong>clave</strong> (key) y un <strong>valor</strong> asociado (value). A diferencia de las listas, donde los elementos se identifican mediante una posición numérica, los diccionarios utilizan nombres o claves para acceder a la información almacenada.
    </p>

    <div className="card mb-3 bg-dark text-white p-3 font-monospace rounded">
      <code>alumno = {"{"}</code><br />
      <code>&nbsp;&nbsp;&nbsp;&nbsp;"nombre": "Juan",</code><br />
      <code>&nbsp;&nbsp;&nbsp;&nbsp;"edad": 20</code><br />
      <code>{"}"}</code><br /><br />
      <code>nombre_alumno = alumno["nombre"]</code><br />
      <code>edad_alumno = alumno["edad"]</code><br />
      <code>print("Nombre:", nombre_alumno)</code><br />
      <code>print("Edad:", edad_alumno)</code>
    </div>

    <div className="alert alert-secondary py-2 mb-3">
      <strong>Salida:</strong><br />
      <code>Nombre: Juan</code><br />
      <code>Edad: 20</code>
    </div>

    <p className="text-secondary leading-relaxed">
      Los diccionarios no son la estructura principal utilizada para operaciones algebraicas; sin embargo, son muy útiles para organizar parámetros de un experimento, registrar configuraciones de convergencia de algoritmos o estructurar bases de datos de propiedades de materiales.
    </p>

    <div className="alert alert-info mb-0">
      <h6 className="fw-bold mb-1">💡 Recomendación técnica:</h6>
      <p className="mb-0 small">
        Para consultar parámetros opcionales en funciones numéricas, utiliza <code>alumno.get("tolerancia", 1e-5)</code>; esto previene errores si la clave no fue suministrada por el usuario.
      </p>
    </div>
  </div>
);

export default FundamentosTab;
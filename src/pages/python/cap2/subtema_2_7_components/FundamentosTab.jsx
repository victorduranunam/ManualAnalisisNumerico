import React from "react";
import { Table } from "react-bootstrap";

const Tema27 = () => {
  return (
    <div className="pe-2">
      {/* 2.7 */}

      <p className="text-secondary">
        Cada una de las alternativas presentadas posee ventajas particulares.
      </p>

      <div className="table-responsive my-3 border rounded shadow-xs">
        <Table striped bordered hover className="align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>Entorno</th>
              <th>Instalación</th>
              <th>Ideal para</th>
            </tr>
          </thead>
          <tbody className="text-secondary">
            <tr>
              <td className="fw-bold text-dark">Google Colab</td>
              <td>No</td>
              <td>Aprender rápidamente y trabajar desde cualquier equipo </td>
            </tr>
            <tr>
              <td className="fw-bold text-dark">Pydroid 3</td>
              <td>Android</td>
              <td>Practicar desde el teléfono </td>
            </tr>
            <tr>
              <td className="fw-bold text-dark">Thonny</td>
              <td>Sí</td>
              <td>Principiantes y cuando se quiere usar una herramienta con pocos requerimientos técnicos</td>
            </tr>
            <tr>
              <td className="fw-bold text-dark">Visual Studio Code</td>
              <td>Sí</td>
              <td>Desarrollo profesional y proyectos grandes </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Tema27;
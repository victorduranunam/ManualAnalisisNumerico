import React from "react";
import CapituloLayout from "../../../components/CapituloLayout";

// Importaciones de los subtemas
import Subtema3_1 from "./subtema_3_1";
import Subtema3_2 from "./subtema_3_2";
import Subtema3_3 from "./subtema_3_3";
import Subtema3_4 from "./subtema_3_4";

export const Index = ({ activeSection, onSelectSection }) => {
  const subtemas = [
    { id: 'subtema_3_1', title: '3.1 Eliminación Gaussiana con pivoteo y descomposición LU' },
    { id: 'subtema_3_2', title: '3.2 Métodos iterativos: Jacobi y Gauss-Seidel' },
    { id: 'subtema_3_3', title: '3.3 Método de las potencias' },
    { id: 'subtema_3_4', title: '3.4 Implementación computacional en problemas de ingeniería' },
  ];

  return (
    <CapituloLayout
      materia="analisisNumerico"
      capNumero={3}
      titulo="Resolución numérica de sistemas de ecuaciones lineales"
      descripcion="Métodos directos e iterativos para la resolución de sistemas de ecuaciones lineales y cálculo de valores característicos."
      objetivos="Aplicar métodos directos e iterativos, con apoyo de herramientas computacionales, para la resolución aproximada de sistemas de ecuaciones lineales y estimación de valores propios en problemas de ingeniería."
      conocimientosPrevios="Conocimientos generales de Álgebra Lineal"
      subtemas={subtemas}
      activeSection={activeSection}
      onSelectSection={onSelectSection}
    >
      {activeSection === 'subtema_3_1' && <Subtema3_1 />}
      {activeSection === 'subtema_3_2' && <Subtema3_2 />}
      {activeSection === 'subtema_3_3' && <Subtema3_3 />}
      {activeSection === 'subtema_3_4' && <Subtema3_4 />}
    </CapituloLayout>
  );
};

export default Index;
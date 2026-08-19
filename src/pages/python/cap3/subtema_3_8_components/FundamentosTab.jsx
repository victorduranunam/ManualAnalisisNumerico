import React from "react";

const FundamentosTab = () => {
  return (
    <div className="pe-2">
      <p className="text-secondary">
        Aunque Python puede mostrar directamente los valores obtenidos durante la ejecución de un programa, en aplicaciones científicas y de análisis numérico generalmente es necesario controlar la forma en que se presentan los resultados.
      </p>
      <p className="text-secondary">
        Por ejemplo, si una variable contiene un número entero, Python mostrará únicamente el valor sin decimales: <code>10</code>
      </p>
      <p className="text-secondary">
        Si el resultado contiene una parte decimal, Python mostrará los decimales disponibles en el valor almacenado: <code>3.141592653589793</code>
      </p>
      <p className="text-secondary">
        Sin embargo, en muchos cálculos numéricos no siempre es conveniente mostrar todos los decimales disponibles, ya que puede generar salidas demasiado extensas o difíciles de interpretar. Por esta razón, Python permite establecer el número de decimales que se desean mostrar mediante diferentes métodos de formato.
      </p>
      <p className="text-secondary">
        Por ejemplo, un resultado puede presentarse con cuatro cifras decimales:
      </p>

      <div className="bg-light p-3 rounded border my-3 font-monospace fw-bold">
        print(f"&#123;radianes:.4f&#125;")
      </div>

      <p className="text-secondary">
        lo cual mostrará únicamente cuatro dígitos después del punto decimal.
      </p>
    </div>
  );
};

export default FundamentosTab;
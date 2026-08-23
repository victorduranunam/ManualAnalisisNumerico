import React from "react";

const FundamentosTab = () => {
  return (
    <div className="pe-2">
      {/* INTRODUCCIÓN */}
      <p className="text-secondary">
        Los datos que utiliza un programa pueden incorporarse asignando valores fijos directamente en el código (valores constantes). Sin embargo, en aplicaciones de ingeniería y análisis numérico, los algoritmos deben ser flexibles para recibir diferentes funciones, intervalos de búsqueda o tolerancias sin tener que modificar el código fuente cada vez que se ejecuten.
      </p>

      {/* LA FUNCIÓN INPUT() */}
      <h6 className="fw-bold text-primary mt-3 mb-2">
        <i className="bi bi-keyboard me-2"></i>1. La Función <code>input()</code>
      </h6>
      <p className="text-secondary">
        Python permite capturar información introducida por el usuario a través del teclado mediante la función nativa <code>input()</code>. Esta función despliega un mensaje (mensaje de solicitud o <em>prompt</em>), pausa la ejecución del programa hasta que el usuario presiona <kbd>Enter</kbd>, y almacena el valor introducido.
      </p>

      <div className="bg-light p-3 rounded border my-3 font-monospace small">
        <span className="text-muted"># Solicitar un dato al usuario</span><br />
        angulo = input(&quot;Ingrese el ángulo en grados: &quot;)
      </div>

      {/* EL PROBLEMA FUNDAMENTAL DEL TIPO DE DATO */}
      <div className="alert alert-warning py-2 small mb-3">
        <i className="bi bi-exclamation-triangle-fill me-2 text-warning"></i>
        <strong>Punto Crítico en Análisis Numérico:</strong> La función <code>input()</code> <strong>siempre devuelve los datos como texto (<code>str</code>)</strong>. Si intentas realizar operaciones algebraicas directamente con el valor ingresado, ocurrirá un error de tipo (<code>TypeError</code>) o una concatenación no deseada (por ejemplo, <code>&quot;10&quot; + &quot;20&quot; = &quot;1020&quot;</code> en lugar de <code>30</code>).
      </div>

      {/* CONVERSIÓN DE TIPOS (TYPE CASTING) */}



    

       

    </div>
  );
};

export default FundamentosTab;
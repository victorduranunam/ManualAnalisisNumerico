import React, { useState } from "react";
import PythonEditor from "../../../../components/PythonEditor.jsx";

const SimuladorTab = () => {
  const [val1, setVal1] = useState("10");
  const [val2, setVal2] = useState("20");

  // El código Python se actualiza dinámicamente con los valores capturados
  const codigoCaptura = `# Subtema 3.3: Captura de datos con input()

# 1. Simulación de los valores capturados desde el teclado como texto
dato1 = "${val1}"
dato2 = "${val2}"

# 2. Impresión de los valores y sus tipos de datos
print("Primer dato ingresado :", dato1, "| Tipo:", type(dato1))
print("Segundo dato ingresado:", dato2, "| Tipo:", type(dato2))

# 3. Suma directa de las dos variables (concatenación de cadenas)
resultado_suma = dato1 + dato2

print("-" * 55)
print("Resultado de dato1 + dato2:", resultado_suma)
print("Nota: Al ser cadenas (str), el operador '+' une los textos ('${val1}' + '${val2}' = '${val1 + val2}')")
print("en lugar de realizar una suma aritmética.")`;

  return (
    <div className="p-3 border rounded bg-light">
      <h5 className="text-primary fw-bold mb-2">
        <i className="bi bi-terminal me-2"></i>Simulador: Captura de Datos con <code>input()</code> (Subtema 3.3)
      </h5>
      <p className="text-muted small mb-3">
        Ingresa dos valores en los campos de captura inferiores. Observa cómo se reflejan en el código de Python y presiona <strong>▶ Ejecutar</strong> para ver cómo se comportan como cadenas de texto (<code>str</code>).
      </p>

      {/* ENTRADA DE DATOS DEL USUARIO */}
      <div className="card mb-3 shadow-sm border-primary">
        <div className="card-header bg-primary text-white fw-bold small">
          <i className="bi bi-keyboard me-2"></i>Simulación de Entrada por Teclado: <code>input(&quot;...&quot;)</code>
        </div>
        <div className="card-body bg-white">
          <div className="row g-3">
            <div className="col-md-6 col-12">
              <label className="form-label small fw-bold text-dark mb-1">
                <code>dato1 = input(&quot;Primer valor: &quot;)</code>
              </label>
              <input
                type="text"
                className="form-control font-monospace border-primary"
                value={val1}
                onChange={(e) => setVal1(e.target.value)}
                placeholder="Ej. 10"
              />
            </div>

            <div className="col-md-6 col-12">
              <label className="form-label small fw-bold text-dark mb-1">
                <code>dato2 = input(&quot;Segundo valor: &quot;)</code>
              </label>
              <input
                type="text"
                className="form-control font-monospace border-primary"
                value={val2}
                onChange={(e) => setVal2(e.target.value)}
                placeholder="Ej. 20"
              />
            </div>
          </div>
        </div>
      </div>

      {/* EDITOR PYTHON CON SALIDA EN CONSOLA */}
      <PythonEditor 
        codigoInicial={codigoCaptura} 
        lineasVisibles={16} 
      />

      <div className="alert alert-warning py-2 small mt-3 mb-0">
        <i className="bi bi-info-circle-fill me-2 text-warning"></i>
        <strong>Observación didáctica:</strong> Al introducir <code>{val1 || "10"}</code> y <code>{val2 || "20"}</code>, la suma resulta en <code>&quot;{val1 + val2}&quot;</code>. Para obtener la suma numérica real, se requiere aplicar la conversión de tipos (<em>casting</em>) como se estudia en el subtema 3.4.
      </div>
    </div>
  );
};

export default SimuladorTab;
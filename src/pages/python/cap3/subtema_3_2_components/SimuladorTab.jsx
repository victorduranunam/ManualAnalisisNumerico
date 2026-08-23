import React from "react";
import PythonEditor from "../../../../components/PythonEditor.jsx";

const SimuladorTab = () => {
  // Código inicial para que el estudiante experimente con los tipos de datos
  const codigoInicial = `# ========================================================
# SIMULADOR: DECLARACIÓN Y EVALUACIÓN DE VARIABLES
# ========================================================

# 1. Entero (int): número máximo de iteraciones
max_iter = 20

# 2. Flotante (float): aproximación y tolerancia exponencial
x_inicial = 1.41421356
tolerancia = 1e-4  # 0.0001

# 3. Booleano (bool): bandera de control de convergencia
cumple_tolerancia = True

# 4. Función matemática lambda: f(x) = x^2 - 2
f = lambda x: x**2 - 2

# --------------------------------------------------------
# Salida en consola: Inspección de valores y tipos en memoria
# --------------------------------------------------------
print("Valor de x_inicial :", x_inicial, "-> Tipo:", type(x_inicial))
print("Valor de tolerancia:", tolerancia, "-> Tipo:", type(tolerancia))
print("Evaluación f(x)    :", f(x_inicial))
print("¿Cumple condición? :", cumple_tolerancia, "-> Tipo:", type(cumple_tolerancia))`;

  return (
    <div className="p-3 border rounded bg-light">
      <h5 className="text-primary fw-bold mb-2">
        <i className="bi bi-terminal me-2"></i>Simulador: Manejo de Variables en Python
      </h5>
      <p className="text-muted small mb-3">
        Modifica los valores de las variables en el editor interactivo y haz clic en <strong>▶ Ejecutar</strong> para observar cómo se almacenan en memoria y cómo Python infiere automáticamente sus tipos de datos.
      </p>

      {/* Editor interactivo con altura ajustada mediante lineasVisibles */}
      <PythonEditor 
        codigoInicial={codigoInicial} 
        lineasVisibles={17} 
      />
    </div>
  );
};

export default SimuladorTab;
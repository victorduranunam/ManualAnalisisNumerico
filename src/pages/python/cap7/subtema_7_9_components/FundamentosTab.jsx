import React from "react";

const FundamentosTab = () => (
  <div className="p-4 border rounded bg-light shadow-sm">
    <h4 className="text-primary fw-bold mb-3">7.9 Organización y Modularidad de Programas</h4>
    
    <p className="text-secondary lh-base">
      El diseño modular mediante funciones permite estructurar programas de ingeniería en bloques claros, desacoplados y fáciles de mantener, siguiendo el principio de <em>responsabilidad única</em>.
    </p>

    {/* Ventajas */}
    <div className="card mb-3 border-0 bg-white shadow-sm p-3">
      <h6 className="fw-bold text-dark mb-2">Principales ventajas de la modularidad:</h6>
      <div className="row g-2 text-secondary small">
        <div className="col-md-6">
          <div className="p-2 border rounded bg-light h-100">
            <strong>1. Evitar repetición de código:</strong> Se escribe una rutina una sola vez y se reutiliza cuantas veces sea necesario.
          </div>
        </div>
        <div className="col-md-6">
          <div className="p-2 border rounded bg-light h-100">
            <strong>2. Facilidad de depuración:</strong> Si un cálculo falla, se prueba y corrige únicamente la función afectada.
          </div>
        </div>
        <div className="col-md-6">
          <div className="p-2 border rounded bg-light h-100">
            <strong>3. Claridad y lectura:</strong> El código principal queda limpio y describe el flujo del algoritmo a alto nivel.
          </div>
        </div>
        <div className="col-md-6">
          <div className="p-2 border rounded bg-light h-100">
            <strong>4. Escalabilidad:</strong> Permite construir bibliotecas propias de métodos numéricos que crecen ordenadamente.
          </div>
        </div>
      </div>
    </div>

    {/* Ejemplo de estructura modular */}
    <div className="card mb-3 bg-dark text-white p-3 font-monospace rounded">
      <div className="text-white-50 mb-1 small"># Estructura modular estándar de un programa numérico</div>
      <pre className="mb-0 text-white bg-transparent border-0 p-0">
<code>{`# 1. Definición del problema
def f(x):
    return x**3 - x - 2

# 2. Algoritmo numérico
def punto_medio(a, b):
    return (a + b) / 2.0

# 3. Flujo principal del programa
def main():
    a = 1.0
    b = 2.0
    xr = punto_medio(a, b)
    print("Aproximación inicial xr =", xr)
    print("f(xr) =", f(xr))

if __name__ == "__main__":
    main()`}</code>
      </pre>
    </div>

    <div className="alert alert-secondary py-2 mb-3">
      <strong>Salida:</strong><br />
      <code>Aproximación inicial xr = 1.5</code><br />
      <code>f(xr) = -0.125</code>
    </div>

    <div className="alert alert-info mb-0">
      <h6 className="fw-bold mb-1">💡 Uso en Métodos Numéricos:</h6>
      <p className="mb-0 small">
        Separar la función a resolver <code>f(x)</code>, el método numérico y la función principal <code>main()</code> es el estándar profesional para construir software científico robusto.
      </p>
    </div>
  </div>
);

export default FundamentosTab;
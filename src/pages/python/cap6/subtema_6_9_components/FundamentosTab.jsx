import React from "react";

const FundamentosTab = () => (
  <div className="p-4 border rounded bg-light shadow-sm">
    <h4 className="text-primary fw-bold mb-3">6.9 Recorrido de Listas y Cadenas de Texto con FOR</h4>
    
    <p className="text-secondary lh-base">
      Una de las aplicaciones más utilizadas del ciclo <code>for</code> en Python es recorrer directamente los elementos almacenados en colecciones nativas. Durante cada repetición, la variable temporal toma el valor de cada elemento de manera secuencial.
    </p>

    <div className="row g-3 mb-3">
      {/* Recorrido de una Lista */}
      <div className="col-md-6">
        <div className="card h-100 bg-dark text-white p-3 font-monospace rounded">
          <div className="text-info fw-bold mb-2"># 6.9.1 Recorrido de una Lista</div>
          <pre className="mb-0 text-white bg-transparent border-0 p-0">
<code>{`datos = [10, 20, 30, 40]

for valor in datos:
    print(valor)`}</code>
          </pre>
        </div>
      </div>

      {/* Recorrido de una Cadena */}
      <div className="col-md-6">
        <div className="card h-100 bg-dark text-white p-3 font-monospace rounded">
          <div className="text-warning fw-bold mb-2"># 6.9.2 Recorrido de Cadenas de Texto</div>
          <pre className="mb-0 text-white bg-transparent border-0 p-0">
<code>{`palabra = "Python"

for letra in palabra:
    print(letra)`}</code>
          </pre>
        </div>
      </div>
    </div>

    {/* Salidas esperadas */}
    <div className="row g-3 mb-3">
      <div className="col-md-6">
        <div className="alert alert-secondary py-2 mb-0 small">
          <strong>Salida lista:</strong><br />
          <code>10</code><br />
          <code>20</code><br />
          <code>30</code><br />
          <code>40</code>
        </div>
      </div>
      <div className="col-md-6">
        <div className="alert alert-secondary py-2 mb-0 small">
          <strong>Salida cadena:</strong><br />
          <code>P</code><br />
          <code>y</code><br />
          <code>t</code><br />
          <code>h</code><br />
          <code>o</code><br />
          <code>n</code>
        </div>
      </div>
    </div>

    {/* Uso en Métodos Numéricos */}
    <div className="alert alert-info mb-0">
      <h6 className="fw-bold mb-1">💡 Uso en Métodos Numéricos:</h6>
      <p className="mb-0 small">
        Las listas son útiles para almacenar secuencias de cadenas (como nombres de métodos a comparar) o para acumular dinámicamente datos iniciales antes de convertirlos en estructuras numéricas.
      </p>
    </div>
  </div>
);

export default FundamentosTab;
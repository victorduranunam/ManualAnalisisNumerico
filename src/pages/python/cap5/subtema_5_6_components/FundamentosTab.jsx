import React from "react";

const FundamentosTab = () => (
  <div className="p-4 border rounded bg-light shadow-sm">
    <h4 className="text-primary fw-bold mb-3">5.6 Selección de rangos de datos (slicing)</h4>
    
    <p className="text-secondary leading-relaxed">
      Además de acceder a elementos individuales, NumPy permite seleccionar grupos de valores mediante rangos. Esta operación se conoce como <strong>slicing</strong> (rebanado) y permite extraer una parte de un arreglo.
    </p>

    <div className="card mb-3 border-0 bg-white shadow-sm p-3">
      <h6 className="fw-bold text-dark">Sintaxis general: <code>arreglo[inicio:final]</code></h6>
      <p className="text-muted small">
        <strong>Nota:</strong> En las operaciones de rebanado de Python y NumPy, el rango de índices se define como un <strong>intervalo semiabierto [inicio, fin)</strong>. Por lo tanto, el índice final actúa únicamente como límite superior y no forma parte de la submatriz generada.
      </p>
      <div className="bg-dark text-white p-2 font-monospace rounded mb-2">
        <code>x = np.array()</code><br />
        <code>resultado = x[1:4]</code><br />
        <code>print(resultado)</code>
      </div>
      <p className="small text-success mb-0"><strong>Resultado:</strong> <code>[1 2 3]</code></p>
    </div>

    <div className="card mb-3 border-0 bg-white shadow-sm p-3">
      <h5 className="text-dark fw-bold mb-2">5.6.1 Omisión de límites en el slicing</h5>
      <p className="text-muted">
        Sintaxis: <code>arreglo[:final]</code> ó <code>arreglo[inicio:]</code>. Cuando alguno de ellos se omite, Python utiliza automáticamente el principio o el final del arreglo:
      </p>
      <div className="bg-dark text-white p-2 font-monospace rounded mb-2">
        <code>x[:3]  # Sin inicio -&gt; Resultado: [0 1 2]</code><br />
        <code>x[2:]  # Sin final  -&gt; Resultado: [2 3 4 5]</code>
      </div>
    </div>

    <div className="card mb-3 border-0 bg-white shadow-sm p-3">
      <h5 className="text-dark fw-bold mb-2">5.6.2 Seleccionar todo el arreglo</h5>
      <p className="text-muted">Si se omiten ambos valores (<code>x[:]</code>), se obtienen todos los elementos del arreglo: <code>[0 1 2 3 4 5]</code>.</p>
    </div>

    <div className="card mb-3 border-0 bg-white shadow-sm p-3">
      <h5 className="text-dark fw-bold mb-2">5.6.3 Índices negativos</h5>
      <p className="text-muted">
        Permiten acceder comenzando desde el final: <code>-1</code> es el último elemento, <code>-2</code> el penúltimo, <code>-3</code> el antepenúltimo:
      </p>
      <div className="table-responsive mb-2">
        <table className="table table-bordered table-sm text-center bg-light">
          <tbody>
            <tr><th>Índice positivo</th><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td></tr>
            <tr className="table-primary"><th>Valor</th><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td></tr>
            <tr><th>Índice negativo</th><td>-5</td><td>-4</td><td>-3</td><td>-2</td><td>-1</td></tr>
          </tbody>
        </table>
      </div>
      <div className="bg-dark text-white p-2 font-monospace rounded">
        <code>x[-1]    # Obtiene el último elemento -&gt; 5</code><br />
        <code>x[-3:]   # Selecciona los 3 últimos elementos -&gt; [3 4 5]</code>
      </div>
    </div>

    <div className="card mb-3 border-0 bg-white shadow-sm p-3">
      <h5 className="text-dark fw-bold mb-2">5.6.4 Paso de un slicing (step)</h5>
      <p className="text-muted">Sintaxis: <code>arreglo[inicio:final:paso]</code>. Si el paso es negativo, recorre en sentido inverso:</p>
      <div className="bg-dark text-white p-2 font-monospace rounded">
        <code>x = np.array()</code><br />
        <code>x[::2]   # Cada 2 posiciones -&gt; [0 2 4 6 8]</code><br />
        <code>x[::-1]  # Invertir arreglo  -&gt; [9 8 7 6 5 4 3 2 1 0]</code>
      </div>
    </div>

    <div className="alert alert-info mb-0">
      <h6 className="fw-bold mb-1">💡 Views en Memoria:</h6>
      <p className="mb-0 small">
        Las operaciones de slicing en NumPy crean <em>vistas</em> (no copias). Modificar un elemento dentro de un corte afectará directamente al arreglo original sin consumir memoria adicional.
      </p>
    </div>
  </div>
);

export default FundamentosTab;
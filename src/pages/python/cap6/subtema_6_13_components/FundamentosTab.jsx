import React from "react";

const FundamentosTab = () => (
  <div className="p-4 border rounded bg-light shadow-sm">
    <h4 className="text-primary fw-bold mb-3">6.13 Uso de break y continue</h4>
    
    <p className="text-secondary leading-relaxed">
      Python proporciona las instrucciones <code>break</code> y <code>continue</code> para alterar el flujo de ejecución normal dentro de ciclos <code>for</code> y <code>while</code>:
    </p>

    <div className="card mb-3 border-0 bg-white shadow-sm p-3">
      <h5 className="text-danger fw-bold mb-2">6.13.1 Instrucción break</h5>
      <p className="text-muted small">Finaliza inmediatamente el ciclo cuando se cumple una condición específica.</p>
      <pre className="bg-dark text-white p-2 font-monospace rounded mb-1">
<code>{`numeros =
for valor in numeros:
    if valor == 20:
        break
    print(valor)`}</code>
      </pre>
      <p className="small text-muted mb-0"><strong>Salida:</strong> <code>5</code>, <code>8</code>, <code>12</code> (se detiene al encontrar 20).</p>
    </div>

    <div className="card mb-3 border-0 bg-white shadow-sm p-3">
      <h5 className="text-primary fw-bold mb-2">6.13.2 Instrucción continue</h5>
      <p className="text-muted small">Omite la ejecución del resto de instrucciones de la iteración actual y pasa a la siguiente.</p>
      <pre className="bg-dark text-white p-2 font-monospace rounded mb-1">
<code>{`numeros =
for valor in numeros:
    if valor == 3:
        continue
    print(valor)`}</code>
      </pre>
      <p className="small text-muted mb-0"><strong>Salida:</strong> <code>1</code>, <code>2</code>, <code>4</code>, <code>5</code> (omitió el 3).</p>
    </div>

    <div className="card mb-3 border-0 bg-white shadow-sm p-3">
      <h5 className="text-dark fw-bold mb-2">Aplicación en análisis numérico:</h5>
      <p className="text-muted small">Detener un cálculo iterativo en cuanto se alcanza la convergencia requerida:</p>
      <pre className="bg-dark text-white p-2 font-monospace rounded mb-0">
<code>{`error = [0.5, 0.2, 0.05, 0.001]
for e in error:
    if e < 0.01:
        break
    print(e)`}</code>
      </pre>
    </div>

    <div className="alert alert-info mb-0">
      <h6 className="fw-bold mb-1">💡 Recomendación técnica:</h6>
      <p className="mb-0 small">
        Utiliza <code>break</code> tras verificar <code>if error &lt; tolerancia:</code> para ahorrar tiempo de cómputo cuando el método ha convergido.
      </p>
    </div>
  </div>
);

export default FundamentosTab;
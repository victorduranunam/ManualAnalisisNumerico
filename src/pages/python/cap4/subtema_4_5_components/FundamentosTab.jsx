import React from "react";

const FundamentosTab = () => (
  <div className="p-4 border rounded bg-light shadow-sm">
    <h4 className="text-primary fw-bold mb-3">4.5 Cadenas de texto</h4>
    
    <p className="text-secondary leading-relaxed">
      Aunque el análisis numérico se enfoca principalmente en valores matemáticos, los programas requieren frecuentemente manejar información de tipo texto. Algunos ejemplos son los mensajes mostrados al usuario, nombres de variables, etiquetas de resultados o generación de reportes.
    </p>

    <p className="text-secondary leading-relaxed">
      En Python, las cadenas de texto se representan mediante el tipo de dato <code>str</code> y pueden delimitarse con comillas simples o dobles.
    </p>

    <div className="card mb-3 bg-dark text-white p-3 font-monospace rounded">
      <code>mensaje = "Análisis Numérico"</code><br /><br />
      <span className="text-muted"># Combinación y concatenación de cadenas:</span><br />
      <code>nombre = "Juan"</code><br />
      <code>texto = "Hola " + nombre</code><br /><br />
      <span className="text-muted"># Uso dentro de print() para mostrar resultados:</span><br />
      <code>print("El resultado es:", texto)</code>
    </div>

    <div className="alert alert-secondary py-2 mb-3">
      <strong>Salida:</strong><br />
      <code>El resultado es: Hola Juan</code>
    </div>

    <div className="alert alert-success mb-0">
      <h6 className="fw-bold mb-1">✨ Recomendación (Formateo con F-Strings):</h6>
      <p className="mb-0 small">
        Para presentar tablas de iteraciones con columnas alineadas y notación científica precisa, utiliza <em>f-strings</em>:
        <br />
        <code>{`print(f"Iteración {k:02d} | x = {x:.6f} | Error = {err:.2e}")`}</code>
      </p>
    </div>
  </div>
);

export default FundamentosTab;
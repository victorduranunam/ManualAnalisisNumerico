import React from "react";

const FundamentosTab = () => (
  <div className="p-4 border rounded bg-light shadow-sm">
    <h4 className="text-primary fw-bold mb-3">4.1 Tipos de datos en Python</h4>
    
    <p className="text-secondary leading-relaxed">
      Python permite trabajar con diferentes tipos de información, los cuales determinan la forma en que los datos pueden ser almacenados y las operaciones que pueden realizarse sobre ellos.
    </p>

    <p className="text-secondary leading-relaxed">
      Una característica fundamental es que <strong>Python no requiere que el programador declare previamente el tipo de una variable</strong>. A diferencia de otros lenguajes de programación, donde es necesario indicar si una variable almacenará un número entero, un número real u otro tipo de dato, Python identifica automáticamente el tipo de información a partir del valor que se le asigna (tipado dinámico).
    </p>

    <p className="text-secondary leading-relaxed">
      Dentro del análisis numérico, los datos pueden clasificarse en tres grupos principales:
    </p>

    <div className="card mb-3 border-0 bg-white shadow-sm">
      <div className="card-body">
        <h5 className="text-dark fw-bold mb-3">4.1.1 Tipos de datos básicos</h5>
        <p className="text-muted">Permiten almacenar valores individuales. Los principales utilizados en análisis numérico son:</p>
        <ul>
          <li><strong>Números enteros (<code>int</code>):</strong> representan valores sin parte decimal.</li>
          <li><strong>Números reales (<code>float</code>):</strong> representan valores con parte decimal y son los más utilizados en cálculos científicos.</li>
          <li><strong>Números complejos (<code>complex</code>):</strong> permiten representar valores con una parte real y una parte imaginaria.</li>
          <li><strong>Cadenas de texto (<code>str</code>):</strong> permiten almacenar información formada por caracteres.</li>
          <li><strong>Valores lógicos (<code>bool</code>):</strong> representan condiciones que pueden tener los valores verdadero (<code>True</code>) o falso (<code>False</code>).</li>
        </ul>
      </div>
    </div>

    <div className="card mb-3 border-0 bg-white shadow-sm">
      <div className="card-body">
        <h5 className="text-dark fw-bold mb-3">4.1.2 Estructuras de datos</h5>
        <p className="text-muted">
          Además de los tipos básicos, Python cuenta con estructuras que permiten almacenar múltiples valores dentro de una misma variable. Son especialmente importantes en análisis numérico para trabajar con conjuntos de datos, vectores y matrices:
        </p>
        <ul>
          <li><strong>Listas (<code>list</code>):</strong> permiten almacenar conjuntos de valores que pueden modificarse durante la ejecución del programa.</li>
          <li><strong>Tuplas (<code>tuple</code>):</strong> permiten almacenar conjuntos de valores que no pueden modificarse después de su creación.</li>
          <li><strong>Diccionarios (<code>dict</code>):</strong> permiten organizar información mediante pares de clave y valor.</li>
          <li><strong>Arreglos (<code>ndarray</code>):</strong> estructuras proporcionadas por la biblioteca NumPy para realizar operaciones matemáticas eficientes con conjuntos de datos.</li>
        </ul>
        <p className="mb-2">A partir de los arreglos de NumPy se representan estructuras matemáticas fundamentales:</p>
        <ul className="mb-0">
          <li><strong>Vectores:</strong> arreglos de una dimensión utilizados para representar conjuntos ordenados de valores.</li>
          <li><strong>Matrices:</strong> arreglos de dos dimensiones utilizados para representar información organizada en filas y columnas.</li>
        </ul>
      </div>
    </div>

    <div className="card mb-3 border-0 bg-white shadow-sm">
      <div className="card-body">
        <h5 className="text-dark fw-bold mb-3">4.1.3 Secuencias numéricas</h5>
        <p className="text-muted">
          En análisis numérico es frecuente trabajar con conjuntos de valores ordenados que representan puntos dentro de un intervalo determinado para evaluar funciones, construir gráficas o aplicar métodos numéricos.
        </p>
        <p>Una secuencia numérica sigue una regla específica:</p>
        <ul>
          <li><strong>Incremento constante:</strong> <code>0, 2, 4, 6, 8</code></li>
          <li><strong>Distribución uniforme en un intervalo:</strong> <code>0, 2.5, 5, 7.5, 10</code></li>
        </ul>
        <p className="mb-0">
          En NumPy, estas secuencias se generan con <code>arange()</code> (establece el incremento entre valores) y <code>linspace()</code> (genera una cantidad de valores distribuidos uniformemente).
        </p>
      </div>
    </div>

    <div className="alert alert-info mb-0">
      <h6 className="fw-bold mb-1">💡 Recomendación y Buenas Prácticas:</h6>
      <p className="mb-0 small">
        En aplicaciones numéricas de alto rendimiento, evita mezclar tipos de datos heterogéneos dentro de estructuras iterables. Verifica siempre el tipo de dato con <code>type()</code> o el atributo <code>.dtype</code> de NumPy para asegurar precisión de doble precisión (<code>float64</code>).
      </p>
    </div>
  </div>
);

export default FundamentosTab;
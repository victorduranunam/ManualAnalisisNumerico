import React, { useMemo, useState } from "react";

function crearPuntosIniciales(cantidad) {
  const puntos = [];

  for (let i = 0; i < cantidad; i++) {
    puntos.push({
      x: i,
      y: i * i,
    });
  }

  return puntos;
}

function numero(valor) {
  const resultado = parseFloat(valor);

  if (Number.isFinite(resultado)) {
    return resultado;
  }

  return null;
}

function formato(valor) {
  if (valor === null || valor === undefined) {
    return "";
  }

  if (!Number.isFinite(valor)) {
    return "";
  }

  return Number(valor).toFixed(6);
}


// ============================================================
// DIFERENCIAS PROGRESIVAS
// ============================================================

function calcularProgresivas(puntos) {
  const columnas = [];

  columnas.push(
    puntos.map(function (punto) {
      return punto.y;
    })
  );

  for (let orden = 1; orden < puntos.length; orden++) {
    const anterior = columnas[orden - 1];
    const actual = [];

    for (let i = 0; i < anterior.length - 1; i++) {
      actual.push(anterior[i + 1] - anterior[i]);
    }

    columnas.push(actual);
  }

  const filas = [];

  for (let i = 0; i < puntos.length; i++) {
    const valores = [];

    for (let orden = 0; orden < columnas.length; orden++) {
      if (i < columnas[orden].length) {
        valores.push(columnas[orden][i]);
      } else {
        valores.push(null);
      }
    }

    filas.push({
      indice: i,
      x: puntos[i].x,
      valores: valores,
    });
  }

  return {
    columnas: columnas,
    filas: filas,
  };
}


// ============================================================
// DIFERENCIAS REGRESIVAS
// ============================================================

function calcularRegresivas(puntos) {
  const columnas = [];

  columnas.push(
    puntos.map(function (punto) {
      return punto.y;
    })
  );

  for (let orden = 1; orden < puntos.length; orden++) {
    const anterior = columnas[orden - 1];
    const actual = [];

    for (let i = 1; i < anterior.length; i++) {
      actual.push(anterior[i] - anterior[i - 1]);
    }

    columnas.push(actual);
  }

  const filas = [];

  for (let i = 0; i < puntos.length; i++) {
    const valores = [];

    valores.push(puntos[i].y);

    for (let orden = 1; orden < columnas.length; orden++) {
      const posicion = i - orden;

      if (
        posicion >= 0 &&
        posicion < columnas[orden].length
      ) {
        valores.push(columnas[orden][posicion]);
      } else {
        valores.push(null);
      }
    }

    filas.push({
      indice: i,
      x: puntos[i].x,
      valores: valores,
    });
  }

  return {
    columnas: columnas,
    filas: filas,
  };
}


// ============================================================
// DIFERENCIAS CENTRALES
// ============================================================

function calcularCentrales(puntos) {
  const progresivas = calcularProgresivas(puntos);
  const filas = [];

  for (
    let orden = 1;
    orden < progresivas.columnas.length;
    orden++
  ) {
    const columna = progresivas.columnas[orden];

    for (let i = 0; i < columna.length; i++) {
      const xInicial = puntos[i].x;
      const xFinal = puntos[i + orden].x;

      const xCentral = (xInicial + xFinal) / 2;

      filas.push({
        orden: orden,
        inicio: i,
        xCentral: xCentral,
        valor: columna[i],
      });
    }
  }

  return filas;
}


// ============================================================
// CARD
// ============================================================

function CardDiferencias({
  titulo,
  color,
  descripcion,
  children,
}) {
  return (
    <div className="card shadow-sm mb-4">

      <div className={"card-header " + color}>
        <h5 className="mb-0 fw-bold">
          {titulo}
        </h5>
      </div>

      <div className="card-body">

        <p className="text-muted small mb-3">
          {descripcion}
        </p>

        {children}

      </div>

    </div>
  );
}


// ============================================================
// TABLA DE ENTRADA
// ============================================================

function TablaEntrada({
  puntos,
  cambiarPunto,
  agregarPunto,
  eliminarPunto,
  limpiar,
}) {
  return (
    <div>

      <div className="table-responsive">

        <table className="table table-bordered table-sm align-middle text-center">

          <thead className="table-light">

            <tr>
              <th style={{ width: "80px" }}>
                i
              </th>

              <th>
                xᵢ
              </th>

              <th>
                f(xᵢ)
              </th>
            </tr>

          </thead>

          <tbody>

            {puntos.map(function (punto, i) {

              return (
                <tr key={i}>

                  <td className="fw-bold">
                    {i}
                  </td>

                  <td>

                    <input
                      type="number"
                      step="any"
                      className="form-control text-center"
                      value={punto.x}
                      onChange={function (e) {
                        cambiarPunto(
                          i,
                          "x",
                          e.target.value
                        );
                      }}
                    />

                  </td>

                  <td>

                    <input
                      type="number"
                      step="any"
                      className="form-control text-center"
                      value={punto.y}
                      onChange={function (e) {
                        cambiarPunto(
                          i,
                          "y",
                          e.target.value
                        );
                      }}
                    />

                  </td>

                </tr>
              );

            })}

          </tbody>

        </table>

      </div>


      <div className="d-flex flex-wrap gap-2 mt-3">

        <button
          type="button"
          className="btn btn-primary"
          onClick={agregarPunto}
        >
          + Agregar punto
        </button>

        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={eliminarPunto}
          disabled={puntos.length <= 2}
        >
          - Eliminar ultimo
        </button>

        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={limpiar}
        >
          Limpiar
        </button>

      </div>

    </div>
  );
}


// ============================================================
// TABLA PROGRESIVA
// ============================================================

function TablaProgresiva({ tabla }) {
  return (
    <div className="table-responsive">

      <table className="table table-bordered table-hover table-sm text-center align-middle">

        <thead className="table-primary">

          <tr>

            <th>i</th>
            <th>xᵢ</th>

            {tabla.columnas.map(
              function (_, orden) {

                return (
                  <th key={orden}>

                    {orden === 0
                      ? "f(xᵢ)"
                      : "Delta" + orden + "f"}

                  </th>
                );

              }
            )}

          </tr>

        </thead>

        <tbody>

          {tabla.filas.map(function (fila) {

            return (
              <tr key={fila.indice}>

                <td className="fw-bold">
                  {fila.indice}
                </td>

                <td>
                  {formato(fila.x)}
                </td>

                {fila.valores.map(
                  function (valor, indice) {

                    return (
                      <td key={indice}>
                        {formato(valor)}
                      </td>
                    );

                  }
                )}

              </tr>
            );

          })}

        </tbody>

      </table>

    </div>
  );
}


// ============================================================
// TABLA REGRESIVA
// ============================================================

function TablaRegresiva({ tabla }) {
  return (
    <div className="table-responsive">

      <table className="table table-bordered table-hover table-sm text-center align-middle">

        <thead className="table-success">

          <tr>

            <th>i</th>
            <th>xᵢ</th>

            {tabla.columnas.map(
              function (_, orden) {

                return (
                  <th key={orden}>

                    {orden === 0
                      ? "f(xᵢ)"
                      : "Nabla" + orden + "f"}

                  </th>
                );

              }
            )}

          </tr>

        </thead>

        <tbody>

          {tabla.filas.map(function (fila) {

            return (
              <tr key={fila.indice}>

                <td className="fw-bold">
                  {fila.indice}
                </td>

                <td>
                  {formato(fila.x)}
                </td>

                {fila.valores.map(
                  function (valor, indice) {

                    return (
                      <td key={indice}>
                        {formato(valor)}
                      </td>
                    );

                  }
                )}

              </tr>
            );

          })}

        </tbody>

      </table>

    </div>
  );
}


// ============================================================
// TABLA CENTRAL
// ============================================================

function TablaCentral({ datos }) {
  return (
    <div className="table-responsive">

      <table className="table table-bordered table-hover table-sm text-center align-middle">

        <thead className="table-warning">

          <tr>

            <th>
              Orden
            </th>

            <th>
              Punto inicial
            </th>

            <th>
              Posicion central
            </th>

            <th>
              Diferencia
            </th>

          </tr>

        </thead>

        <tbody>

          {datos.map(function (fila, indice) {

            return (
              <tr key={indice}>

                <td className="fw-bold">
                  Diferencia {fila.orden}
                </td>

                <td>
                  x<sub>{fila.inicio}</sub>
                </td>

                <td>
                  {formato(fila.xCentral)}
                </td>

                <td className="fw-semibold">
                  {formato(fila.valor)}
                </td>

              </tr>
            );

          })}

        </tbody>

      </table>

    </div>
  );
}


// ============================================================
// COMPONENTE PRINCIPAL
// ============================================================

const SimuladorTab = () => {

  const [puntos, setPuntos] = useState(
    crearPuntosIniciales(5)
  );


  function cambiarPunto(indice, campo, valor) {

    setPuntos(function (anteriores) {

      return anteriores.map(
        function (punto, i) {

          if (i !== indice) {
            return punto;
          }

          return {
            ...punto,
            [campo]: valor,
          };

        }
      );

    });
  }


  function agregarPunto() {

    setPuntos(function (anteriores) {

      const ultimo =
        anteriores[anteriores.length - 1];

      const ultimoX = numero(ultimo.x);

      const nuevoX =
        ultimoX === null
          ? anteriores.length
          : ultimoX + 1;

      return [
        ...anteriores,
        {
          x: nuevoX,
          y: 0,
        },
      ];

    });
  }


  function eliminarPunto() {

    setPuntos(function (anteriores) {

      if (anteriores.length <= 2) {
        return anteriores;
      }

      return anteriores.slice(
        0,
        anteriores.length - 1
      );

    });
  }


  function limpiar() {

    setPuntos([
      {
        x: "",
        y: "",
      },
      {
        x: "",
        y: "",
      },
    ]);

  }


  const calculo = useMemo(
    function () {

      const puntosNumericos = [];

      for (let i = 0; i < puntos.length; i++) {

        const x = numero(puntos[i].x);
        const y = numero(puntos[i].y);

        if (x === null || y === null) {

          return {
            valido: false,
            mensaje:
              "Todos los valores de x y f(x) deben ser numericos.",
          };

        }

        puntosNumericos.push({
          x: x,
          y: y,
        });

      }


      for (
        let i = 0;
        i < puntosNumericos.length;
        i++
      ) {

        for (
          let j = i + 1;
          j < puntosNumericos.length;
          j++
        ) {

          if (
            Math.abs(
              puntosNumericos[i].x -
              puntosNumericos[j].x
            ) < 1e-12
          ) {

            return {
              valido: false,
              mensaje:
                "No puede haber valores repetidos de x.",
            };

          }

        }

      }


      puntosNumericos.sort(
        function (a, b) {
          return a.x - b.x;
        }
      );


      const pasos = [];

      for (
        let i = 0;
        i < puntosNumericos.length - 1;
        i++
      ) {

        pasos.push(
          puntosNumericos[i + 1].x -
          puntosNumericos[i].x
        );

      }


      const h = pasos[0];

      const pasoUniforme =
        pasos.every(
          function (paso) {

            return (
              Math.abs(paso - h) <
              0.00000001
            );

          }
        );


      return {
        valido: true,
        puntos: puntosNumericos,
        h: h,
        pasoUniforme: pasoUniforme,

        progresivas:
          calcularProgresivas(
            puntosNumericos
          ),

        regresivas:
          calcularRegresivas(
            puntosNumericos
          ),

        centrales:
          calcularCentrales(
            puntosNumericos
          ),
      };

    },
    [puntos]
  );


  return (
    <div className="container-fluid py-3">

      <div className="text-center mb-4">

        <h3 className="fw-bold">
          Diferencias Finitas
        </h3>

        <p className="text-muted">
          Construccion de tablas de diferencias
          progresivas, regresivas y centrales.
        </p>

      </div>


      <div className="card shadow-sm mb-4">

        <div className="card-header bg-primary text-white">

          <h5 className="mb-0 fw-bold">
            Datos de entrada
          </h5>

        </div>

        <div className="card-body">

          <p className="text-muted small">

            Introduce los valores de x y f(x).
            Puedes agregar tantos puntos como
            necesites.

          </p>


          <TablaEntrada
            puntos={puntos}
            cambiarPunto={cambiarPunto}
            agregarPunto={agregarPunto}
            eliminarPunto={eliminarPunto}
            limpiar={limpiar}
          />


          {calculo.valido && (

            <div className="row g-2 mt-3">

              <div className="col-md-4">

                <div className="border rounded p-3 text-center">

                  <small className="text-muted">
                    Numero de puntos
                  </small>

                  <div className="fw-bold fs-5">
                    {calculo.puntos.length}
                  </div>

                </div>

              </div>


              <div className="col-md-4">

                <div className="border rounded p-3 text-center">

                  <small className="text-muted">
                    Paso h
                  </small>

                  <div className="fw-bold fs-5">
                    {formato(calculo.h)}
                  </div>

                </div>

              </div>


              <div className="col-md-4">

                <div className="border rounded p-3 text-center">

                  <small className="text-muted">
                    Espaciamiento
                  </small>

                  <div className="fw-bold fs-5">

                    {calculo.pasoUniforme
                      ? "Uniforme"
                      : "No uniforme"}

                  </div>

                </div>

              </div>

            </div>

          )}


          {!calculo.valido && (

            <div className="alert alert-warning mt-3 mb-0">

              {calculo.mensaje}

            </div>

          )}

        </div>

      </div>


      {calculo.valido && (

        <CardDiferencias
          titulo="1. Diferencias Finitas Progresivas"
          color="bg-primary text-white"
          descripcion="Las diferencias progresivas se obtienen utilizando los valores siguientes de cada columna."
        >

          <TablaProgresiva
            tabla={calculo.progresivas}
          />

        </CardDiferencias>

      )}


      {calculo.valido && (

        <CardDiferencias
          titulo="2. Diferencias Finitas Regresivas"
          color="bg-success text-white"
          descripcion="Las diferencias regresivas se obtienen utilizando el valor actual y el valor anterior."
        >

          <TablaRegresiva
            tabla={calculo.regresivas}
          />

        </CardDiferencias>

      )}


      {calculo.valido && (

        <CardDiferencias
          titulo="3. Diferencias Finitas Centrales"
          color="bg-warning"
          descripcion="Las diferencias centrales se muestran ubicadas en la posicion central de los puntos utilizados."
        >

          {!calculo.pasoUniforme && (

            <div className="alert alert-warning small">

              <strong>Advertencia:</strong>{" "}

              Los valores de x no tienen un
              espaciamiento uniforme.

            </div>

          )}


          <TablaCentral
            datos={calculo.centrales}
          />

        </CardDiferencias>

      )}


      {calculo.valido && (

        <div className="alert alert-info mt-3">

          <strong>Nota:</strong>{" "}

          Las tres tablas se generan automaticamente
          a partir de los mismos datos introducidos
          en la tabla de entrada.

        </div>

      )}

    </div>
  );
};


export default SimuladorTab;
import React, { useState, useEffect } from "react";
import './App.css';

export function ManejoDeLlamadas({ llamadas }) {
  const [llamadasGeneradas, setLlamadasGeneradas] = useState([])
  const [celdaEnEdicion, setCeldaEnEdicion] = useState(null);
  const [valoresEditados, setValoresEditados] = useState({});



  useEffect(() => {
    setLlamadasGeneradas(llamadas);
  }, [llamadas]);

  
  function editarCelda(index) {
    setCeldaEnEdicion(index);
    setValoresEditados(llamadasGeneradas[index]);
  }

  function manejarCambio(event, campo){
    const nuevoValor = event.target.value;
    if(nuevoValor = 10){
    setValoresEditados({
      ...valoresEditados,
      [campo]: nuevoValor
    });}
  }
  
  function guardarCambio(index, campo) {
    const nuevasLlamadas = [...llamadasGeneradas];
    nuevasLlamadas[index][campo] = valoresEditados[campo];
    setLlamadasGeneradas(nuevasLlamadas);
    setCeldaEnEdicion(null);
  }


  function borrar(index){
    if(confirm("¿Seguro que quieres borrar?")){
      const nuevasLlamadas = [...llamadasGeneradas];
      nuevasLlamadas.splice(index, 1);
      setLlamadasGeneradas(nuevasLlamadas);
    } 
  }

    return (
    <>
      <table id="tabla">
        <thead>
          <tr>
            <th>Origen</th>
            <th>Destino</th>
            <th>Duración</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {llamadasGeneradas.map((llamada, index) => (
            <tr key={index} >
              <td>
              {celdaEnEdicion === index ? (
                <>
                <input
                  type="number"
                  defaultValue={llamada.origen}
                  onChange={(e) => manejarCambio(e, "origen")}
                />
                <button onClick={() => guardarCambio(index, "origen")}>Guardar</button>
                <button onClick={() => setCeldaEnEdicion(null)}>Cancelar</button>
               </>
              ) : (
                llamada.origen
              )}
             </td>
              <td >
              {celdaEnEdicion === index ? (
                <>
                <input
                  type="number"
                  defaultValue={llamada.destino }
                  onChange={(e) => manejarCambio(e, "destino")}
                />
                <button onClick={() => guardarCambio(index, "destino")}>Guardar</button>
                <button onClick={() => setCeldaEnEdicion(null)}>Cancelar</button>
               </>
              ) : (
                llamada.destino
              )}
              </td>
              <td>
                {llamada.duracionDeLlamada} seg</td>
              <td>
                <button onClick={() => borrar(index)}>Eliminar</button>
                <button onClick={() => editarCelda(index)}>Editar</button>
             </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
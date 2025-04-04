import React, { useState } from "react";
import './App.css';
import { createElement } from "react";

export function SistemaDeGestion({ llamadas }) {
  const [celdaEnEdicion, setCeldaEnEdicion] = useState(null);
  const [valoresEditados, setValoresEditados] = useState({origen:0, destino:0, duracionDeLlamada:0});
  const editarCelda =(index) => {
    setCeldaEnEdicion(index)
  }
 
  function manejarCambio(event) {
    const nuevoValor = event.target.value;
    setValoresEditados(nuevoValor); // Actualiza el estado
  }
  function guardarCambio(index, campo){
    // console.log(llamadas[index].origen=valoresEditados)
    if(campo == "origen"){llamadas[index].origen=valoresEditados}
    if(campo == "destino"){llamadas[index].destino=valoresEditados}

    setCeldaEnEdicion(null)
    console.log(llamadas)
  }
  function borrar(index){
    if(confirm("quieres borrar")){
      
     console.log(llamadas[index])
  
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
          {llamadas.map((llamada, index) => (
            <tr key={index} >
              <td>
              {celdaEnEdicion === index ? (
                <>
                <input
                  type="number"
                  defaultValue={llamada.origen}
                  onChange={(e) => manejarCambio(e, index)}
                />
                <button onClick={() => guardarCambio(index, "origen")}>Guardar</button>
                <button>Cancelar</button>
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
                  onChange={(e) => manejarCambio(e, index)}
                />
                <button onClick={() => guardarCambio(index, "destino")}>Guardar</button>
                <button>Cancelar</button>
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
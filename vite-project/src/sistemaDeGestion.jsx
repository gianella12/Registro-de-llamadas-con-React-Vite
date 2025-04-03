import React from "react";
import './App.css';

export function SistemaDeGestion({ llamadas }) {
  function editar(){
    console.log("holas")
  }
  
  
    return (
    <>
      <table>
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
            <tr key={index}>
              <td onClick={editar}>{llamada.origen}</td>
              <td>{llamada.destino}</td>
              <td>{llamada.duracionDeLlamada} segundos</td>
              <td>
                <button >Eliminar</button>
                <button>Editar</button>
             </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
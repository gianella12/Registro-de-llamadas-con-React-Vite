import React, { useState, useEffect } from "react";

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
    setValoresEditados({
      ...valoresEditados,
      [campo]: nuevoValor
    });
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
            <th className="border border-black p-2 text-left bg-[#c78ce9]">Origen</th>
            <th className="border border-black p-2 text-left bg-[#c78ce9]">Destino</th>
            <th className="border border-black p-2 text-left bg-[#c78ce9]">Duración</th>
            <th className="border border-black p-2 text-left bg-[#c78ce9]"></th>
          </tr>
        </thead>
        <tbody>
          {llamadasGeneradas.map((llamada, index) => (
            <tr key={index} >
              <td className="border border-black p-2 text-left">
              {celdaEnEdicion === index ? (
                <>
                <input
                  type="number"
                  defaultValue={llamada.origen}
                  onChange={(e) => manejarCambio(e, "origen")}
                />
                <button onClick={() => guardarCambio(index, "origen")} className="bg-[#baacc4] border border-purple-600 rounded px-4 py-1 cursor-pointer hover:bg-purple-200 transition">
                  Guardar
                </button>
                <button onClick={() => setCeldaEnEdicion(null)} className="bg-[#baacc4] border border-purple-600 rounded px-4 py-1 cursor-pointer hover:bg-purple-200 transition">
                  Cancelar
                </button>
               </>
              ) : (
                llamada.origen
              )}
             </td>
              <td className="border border-black p-2 text-left">
              {celdaEnEdicion === index ? (
                <>
                <input
                  type="number"
                  defaultValue={llamada.destino }
                  onChange={(e) => manejarCambio(e, "destino")}
                />
                <button onClick={() => guardarCambio(index, "destino")} className="bg-[#baacc4] border border-purple-600 rounded px-4 py-1 cursor-pointer hover:bg-purple-200 transition">
                  Guardar
                </button>
                <button onClick={() => setCeldaEnEdicion(null)} className="bg-[#baacc4] border border-purple-600 rounded px-4 py-1 cursor-pointer hover:bg-purple-200 transition">
                  Cancelar
                </button>
               </>
              ) : (
                llamada.destino
              )}
              </td>
              <td className="border border-black p-2 text-left">
                {llamada.duracionDeLlamada} seg</td>
              <td className="border border-black p-2 text-left">
                <button onClick={() => borrar(index)} className="bg-[#baacc4] border border-purple-600 rounded px-4 py-1 cursor-pointer hover:bg-purple-200 transition">
                  Eliminar
                </button>
                <button onClick={() => editarCelda(index)} className="bg-[#baacc4] border border-purple-600 rounded px-4 py-1 cursor-pointer hover:bg-purple-200 transition">
                  Editar
                </button>
             </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
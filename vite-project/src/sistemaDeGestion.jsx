import React, { useState, useEffect } from "react";

export function ManejoDeLlamadas({ llamadas }) {
  const [llamadasGeneradas, setLlamadasGeneradas] = useState([])
  const [celdaEnEdicion, setCeldaEnEdicion] = useState(null);
  const [valoresEditados, setValoresEditados] = useState({});
  const [numeroInvalido, setNumeroInvalido] = useState(false);




  useEffect(() => {
    setLlamadasGeneradas(llamadas);
  }, [llamadas]);


  function editarCelda(index) {
    setCeldaEnEdicion(index);
    setValoresEditados(llamadasGeneradas[index]);
  }

  function manejarCambio(event, campo) {
    const nuevoValor = event.target.value;

    if(campo === "duracionDeLlamada"){
      if(nuevoValor.length > 1 && nuevoValor.length <= 3){
      setNumeroInvalido((estadoAnterior) => ({
        ...estadoAnterior,
        [campo]: false,
      }));
  
      setValoresEditados({
        ...valoresEditados,
        [campo]: nuevoValor,
      });
    }else{
      setNumeroInvalido((estadoAnterior) => ({
        ...estadoAnterior,
        [campo]: true,
      }));
    }
    return;
  }



    if(nuevoValor.length < 10 ){
      setNumeroInvalido((estadoAnterior) => ({
        ...estadoAnterior,
        [campo]: true,
      }));
      return;
    }


    if (nuevoValor.length === 10) {
      setNumeroInvalido((estadoAnterior) => ({
        ...estadoAnterior,
        [campo]: false,
      }));
  
      setValoresEditados({
        ...valoresEditados,
        [campo]: nuevoValor,
      });
    }
  }

  function guardarCambio(index) {
    const nuevasLlamadas = [...llamadasGeneradas];
    nuevasLlamadas[index] = { ...valoresEditados }
    setLlamadasGeneradas(nuevasLlamadas);
    setCeldaEnEdicion(null);
  }


  function borrar(index) {
    if (confirm("¿Seguro que quieres borrar?")) {
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
                   {numeroInvalido["origen"] && <p className="text-red-500">El número es inválido</p>}
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
                    defaultValue={llamada.destino}
                    onChange={(e) => manejarCambio(e, "destino")}
                  />
                  {numeroInvalido["destino"] && <p className="text-red-500">Ingrese un número de 10 digitos</p>}
                  </>
                ) : (
                  llamada.destino
                )}
              </td>
              <td className="border border-black p-2 text-left">
              {celdaEnEdicion === index ? (
                <>
                <input
                  type="number"
                  defaultValue={llamada.duracionDeLlamada}
                  onChange={(e) => manejarCambio(e, "duracionDeLlamada")}
                />
                {numeroInvalido["duracionDeLlamada"] && <p className="text-red-500">El número es inválido</p>}
                </>
              ) : (
                llamada.duracionDeLlamada

              )}
              </td>
              <td className="border border-black p-2 text-left">
                {celdaEnEdicion === index ? (
                  <>
                    <button onClick={() => guardarCambio(index)} className="bg-green-300 border border-green-600 rounded px-4 py-1 cursor-pointer hover:bg-green-400 transition">
                      Guardar
                    </button>
                    <button onClick={() => setCeldaEnEdicion(null)} className="bg-red-300 border border-red-600 rounded px-4 py-1 cursor-pointer hover:bg-red-400 transition">
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => borrar(index)} className="bg-[#baacc4] border border-purple-600 rounded px-4 py-1 cursor-pointer hover:bg-purple-200 transition">
                      Eliminar
                    </button>
                    <button onClick={() => editarCelda(index)} className="bg-[#baacc4] border border-purple-600 rounded px-4 py-1 cursor-pointer hover:bg-purple-200 transition">
                      Editar
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
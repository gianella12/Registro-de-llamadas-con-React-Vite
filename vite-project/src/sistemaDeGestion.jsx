import React, { useState, useEffect } from "react";
import Modal from './componentes/modal';

export function ManejoDeLlamadas({ llamadas, calcularPromedioYtotal }) {
  const [llamadasGeneradas, setLlamadasGeneradas] = useState([])
  const [celdaEnEdicion, setCeldaEnEdicion] = useState(null);
  const [valoresEditados, setValoresEditados] = useState({});
  const [numeroInvalido, setNumeroInvalido] = useState({});
  const [estadoModal, setCambiarEstadoModal] = useState(false);


  useEffect(() => {
    setLlamadasGeneradas(llamadas)
    setCeldaEnEdicion(null);
  }, [llamadas]);


  function editarCelda(index) {
    setCeldaEnEdicion(index);
    setValoresEditados(llamadasGeneradas[index]);
  }

  function manejarCambio(event, campo) {
    const nuevoValor = event.target.value;

    if (campo === "duracionDeLlamada") {
      if (nuevoValor > 29 && nuevoValor <= 600) {
        setNumeroInvalido((estadoAnterior) => ({
          ...estadoAnterior,
          [campo]: false,
        }));

        setValoresEditados({
          ...valoresEditados,
          [campo]: nuevoValor,
        });
      } else {
        setNumeroInvalido((estadoAnterior) => ({
          ...estadoAnterior,
          [campo]: true,
        }));
      }
      return;
    }

    if (nuevoValor.length < 10) {
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

 async function borrar(index) {
      try {
        const respuesta = await fetch(`http://localhost:3000/borrar-telefonos`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({index}),
        });
        const resultado = await respuesta.json();
        setCambiarEstadoModal(!estadoModal);
        setLlamadasGeneradas(resultado);
        calcularPromedioYtotal(resultado);
       
  
      } catch (error) {
        console.log("hay un error")
      }
    
  }



  async function enviarDatosAlServidor(indice, datosEditados) {
    try {
      const respuesta = await fetch(`http://localhost:3000/editar-telefonos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          indice: indice,
          datosEditados: {
            origen: Number(datosEditados.origen),
            destino: Number(datosEditados.destino),
            duracionDeLlamada: Number(datosEditados.duracionDeLlamada)
          }
        }),
      });
      const resultado = await respuesta.json();
      setLlamadasGeneradas(resultado);
      setCeldaEnEdicion(null);

      calcularPromedioYtotal(resultado);

    } catch (error) {
      console.log("hay un error")
    }
  }


  return (
    <>
    {llamadasGeneradas.length > 0 ? (
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
                    <button onClick={() => enviarDatosAlServidor(index, valoresEditados)} className="bg-green-300 border border-green-600 rounded px-4 py-1 cursor-pointer hover:bg-green-400 transition">
                      Guardar
                    </button>
                    <button onClick={() => setCeldaEnEdicion(null)} className="bg-red-300 border border-red-600 rounded px-4 py-1 cursor-pointer hover:bg-red-400 transition">
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setCambiarEstadoModal(!estadoModal)} className="bg-[#baacc4] border border-purple-600 rounded px-4 py-1 cursor-pointer hover:bg-purple-200 transition">
                      Eliminar
                    </button>
                    <Modal
                      estado={estadoModal}
                      cambiarEstado={setCambiarEstadoModal}
                    >
                      <p class="text-gray-700 text-base font-medium text-center">¿Seguro que quieres borrar el registro?</p>
                      <button onClick={() => borrar(index)} class="bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-1.5 px-3 rounded shadow-sm transition duration-300">
                        Aceptar
                        </button>
                    </Modal>
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
    ) : (
      <p>No hay llamadas</p>
    )}
    </>
  );
}
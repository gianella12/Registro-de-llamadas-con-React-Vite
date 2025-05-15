import React, { useState, useEffect } from "react";
import Modal from './componentes/modal';
import TarjetasLlamadas from "./componentes/tarjetaDeLlamadasMobile";
import { useValidacionLlamada } from "./hooks/useValidacionesllamadas";

export function ManejoDeLlamadas({ llamadas, setLlamadas, calcularPromedioYtotal }) {
  const [celdaEnEdicion, setCeldaEnEdicion] = useState(null);
  const [estadoModal, setCambiarEstadoModal] = useState(false);
  const [idSeleccionado, setIdSeleccionado] = useState(null);

   const {
    numeroInvalido,
    valoresEditados,
    manejarCambio,
    setValoresEditados
  } = useValidacionLlamada();


  useEffect(() => {
    calcularPromedioYtotal(llamadas)
    setCeldaEnEdicion(null)
  }, [llamadas]);

  function editarCelda(index) {
    setCeldaEnEdicion(index);
    setValoresEditados(llamadas[index]);
  }

  async function borrar(id_llamada) {
    try {
      const respuesta = await fetch(`http://localhost:3000/borrar-telefonos`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_llamada }),
      });
      const resultado = await respuesta.json();
      setCambiarEstadoModal(!estadoModal);
      setLlamadas(resultado);



    } catch (error) {
      console.log("hay un error", error)
    }

  }



  async function enviarDatosAlServidor(id_llamada, datosEditados) {
    try {
      const respuesta = await fetch(`http://localhost:3000/editar-telefonos`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id_llamada: id_llamada,
          datosEditados: {
            origen: Number(datosEditados.origen),
            destino: Number(datosEditados.destino),
            duracion: Number(datosEditados.duracion)
          }
        }),
      });
      const resultado = await respuesta.json();
      setLlamadas(resultado);
      setCeldaEnEdicion(null);


    } catch (error) {
      console.log("hay un error")
    }
  }
  function pasarDatos(llamadaId) {
    setIdSeleccionado(llamadaId);
    setCambiarEstadoModal(true);
  }


  return (
    <>
      {llamadas.length > 0 ? (
        <>
          <div className="hidden sm:block max-h-96 overflow-auto">
            <table id="tabla" className="border border-[#f0eaff] bg-[#c78ce9] shadow-lg rounded-lg overflow-hidden w-full max-w-md mx-auto table-auto ">
              <thead>
                <tr>
                  <th className="border border-black p-2 text-left bg-[#c78ce9]">Origen</th>
                  <th className="border border-black p-2 text-left bg-[#c78ce9]">Destino</th>
                  <th className="border border-black p-2 text-left bg-[#c78ce9]">Duración</th>
                  <th className="border border-black p-2 text-left bg-[#c78ce9]"></th>
                </tr>
              </thead>
              <tbody>
                {llamadas.map((llamada, index) => (
                  <tr key={index} >
                    <td className="border border-black p-2 text-left">
                      {celdaEnEdicion === index ? (
                        <>
                          <input
                            type="number"
                            defaultValue={llamada.origen}
                            onChange={(e) => manejarCambio(e, "origen")}
                            className="bg-white text-black dark:bg-[#1a1a1a] dark:text-white border border-gray-400 rounded px-2 py-1"
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
                            className="bg-white text-black dark:bg-[#1a1a1a] dark:text-white border border-gray-400 rounded px-2 py-1"
                          />
                          {numeroInvalido["destino"] && <p className="text-red-500">El numero es invalido</p>}
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
                            defaultValue={llamada.duracion}
                            onChange={(e) => manejarCambio(e, "duracion")}
                            className="bg-white text-black dark:bg-[#1a1a1a] dark:text-white border border-gray-400 rounded px-2 py-1"
                          />
                          {numeroInvalido["duracion"] && <p className="text-red-500">El número es inválido</p>}
                        </>
                      ) : (
                        llamada.duracion

                      )}
                    </td>
                    <td className="border border-black p-2 text-left">
                      {celdaEnEdicion === index ? (
                        <>
                          <button onClick={() => enviarDatosAlServidor(llamada.id_llamada, valoresEditados)} className="bg-green-300 border border-green-600 rounded px-4 py-1 cursor-pointer hover:bg-green-400 transition w-32 h-10">
                            Guardar
                          </button>
                          <button onClick={() => setCeldaEnEdicion(null)} className="bg-red-300 border border-red-600 rounded px-4 py-1 cursor-pointer hover:bg-red-400 transition w-32 h-10">
                            Cancelar
                          </button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => {
                            pasarDatos(llamada.id_llamada)
                          }} className="bg-[#baacc4] border border-purple-600 rounded px-4 py-1 cursor-pointer hover:bg-purple-200 transition w-32 h-10">
                            Eliminar
                          </button>
                          <button onClick={() => editarCelda(index)} className="bg-[#baacc4] border border-purple-600 rounded px-4 py-1 cursor-pointer hover:bg-purple-200 transition w-32 h-10">
                            Editar
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="block sm:hidden space-y-4">
            <TarjetasLlamadas
              llamadas={llamadas}
              pasarDatosBorrar = {pasarDatos}
            />
          </div>
          
        </>
      ) : (
        <p>No hay llamadas</p>
      )}

      {estadoModal && (
        <Modal
          estado={estadoModal}
          cambiarEstado={setCambiarEstadoModal}
        >
          <p className="text-gray-700 text-base font-medium text-center">¿Seguro que quieres borrar el registro?</p>
          <button onClick={() => borrar(idSeleccionado)} className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-1.5 px-3 rounded shadow-sm transition duration-300">
            Aceptar
          </button>
        </Modal>
      )}

    </>
  );
}
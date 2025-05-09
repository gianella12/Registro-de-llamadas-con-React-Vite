import React, { useState, useEffect } from "react";
import { ManejoDeLlamadas } from './sistemaDeGestion';
import Modal from './componentes/modal';
import ModalEspera from './componentes/modalEspera'
import { NuevaSeccion } from "./nuevaSeccion";
import { Tarjeta } from "./componentes/tarjeta";
import Mood from "./componentes/mood";


export const App = () => {
  const [valor, setValor] = useState('');
  const [llamadas, setLlamadas] = useState([]);
  const [duracionTotal, setDuracionTotal] = useState(0);
  const [promedio, setPromedio] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [mostrarNuevaSeccion, setMostrarNuevaSeccion] = useState(false);
  const [generando, setGenerando] = useState(false);


  useEffect(() => {
    fetch('http://localhost:3000/')
      .then(res => res.json())
      .then(data => {
        setLlamadas(data);

        setTimeout(() => {
          setCargando(false);
        }, 1000);

      })
      .catch(err => console.error('Error al traer las llamadas:', err));
  }, []);


  async function pedirLlamadasAlServidor(cantidad) {
    if(cantidad > 0){
    try {
      setGenerando(true)

      const respuesta = await fetch(`http://localhost:3000/generar-telefonos/${cantidad}`);
      const datos = await respuesta.json();
      console.log(datos)
      setLlamadas(datos);
    } catch (error) {
      console.error('Error al obtener llamadas del servidor:', error);
    } finally {
      setTimeout(() => {
        setGenerando(false);
      }, 1500);
    }
    }else{
      console.log('la cantidad es invalida')
    }
  }

  function calcularPromedioYtotal(llamadasGeneradas) {
    if (!Array.isArray(llamadasGeneradas)) {
      console.error("⚠️ Esto no es un array:", llamadasGeneradas);
      return;
    }
    try {
      const total = llamadasGeneradas.reduce((acc, llamada) => acc + parseInt(llamada.duracion), 0);
      const promedio = total / llamadasGeneradas.length;

      setDuracionTotal(total);
      setPromedio(promedio)
    } catch (error) {
      console.error("Esto no es un array:", llamadasGeneradas);
    }
  }

  function abrirNuevaSeccion() {
    setMostrarNuevaSeccion(true)
    console.log("adentro de la funcion abrirNuevaSeccion")
  }


  return (
    <>
      {mostrarNuevaSeccion ? (
        <NuevaSeccion setMostrarNuevaSeccion={setMostrarNuevaSeccion}
          setLlamadas={setLlamadas} />
      ) : (
        // <div  className="max-w-[1280px] mx-auto p-8 text-center grid justify-items-center font-sans min-h-screen">
        <div className="max-w-[1280px] mx-auto p-8 text-center grid justify-items-center font-sans min-h-screen">
          <section className="mb-5">
            <Mood />

            <div className="absolute top-0 right-0 m-4">
              <button onClick={() => abrirNuevaSeccion()} className="bg-[#8a75a8] border border-purple-800 rounded px-4 py-2 cursor-pointer hover:bg-purple-400 transition text-white shadow-md">
                Crear nueva llamada
              </button>
            </div>


            <h2 className="text-2xl font-semibold mb-2">Registro de llamadas</h2>
            <p className="mb-4">Ingresa el número de llamadas que quieras generar.</p>



            <input
              type="text"
              value={valor}
              onChange={(e) => setValor(Number(e.target.value))}
              className="border border-purple-400 dark:border-purple-600 rounded px-2 py-1 mr-2 w-[160px] h-[30px] bg-white dark:bg-gray-800 text-black dark:text-white"
            />
            {generando ? (
              <ModalEspera estado={generando} >
                <p>Generando las llamadas...</p>
                <img
                  src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzg5enpzNmtqbmpjYThkbTVzYjg3dGVxdHppN3JkMnl3ejJpNmduMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tHIRLHtNwxpjIFqPdV/giphy.gif"
                  alt="Gatito esperando pacientemente"
                  className="w-48 mx-auto"
                />
              </ModalEspera>
            ) : null}
            <button
              onClick={() => pedirLlamadasAlServidor(valor)}
              disabled={generando}
              className="bg-[#baacc4] dark:bg-purple-600 border border-purple-600 dark:border-purple-400 rounded px-4 py-1 cursor-pointer hover:bg-purple-200 dark:hover:bg-purple-500 transition text-black dark:text-white">
              Generar
            </button>

          </section>

          {cargando ? (
            <Modal estado={cargando} cambiarEstado={setCargando}>
              <p>Cargando las llamadas...</p>
              <img
                src="https://media.tenor.com/2roX3uxz_68AAAAC/cat-typing.gif"
                alt="Gatito tecleando como loco"
                className="w-48 mx-auto"
              />
            </Modal>
          ) : (
            llamadas.length > 0 && (
              <ManejoDeLlamadas
                llamadas={llamadas}
                setLlamadas={setLlamadas}
                calcularPromedioYtotal={calcularPromedioYtotal}
              />
            )
          )}


          {duracionTotal > 0 && promedio > 0 && (
            <Tarjeta>
              <p className="mb-2 text-[#7a56a0] text-lg font-semibold">
                Duración total: {duracionTotal} seg
              </p>
              <p className="text-[#7a56a0] text-lg font-semibold">
                Promedio por llamada: {promedio.toFixed(2)} seg
              </p>
            </Tarjeta>
          )}
        </div>
      )}
    </>
  );
}


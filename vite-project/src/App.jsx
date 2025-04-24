import { useState } from 'react';
import { ManejoDeLlamadas } from './sistemaDeGestion';

export const App = () => {
  const [valor, setValor] = useState('');
  const [llamadas, setLlamadas] = useState([]);
  const [duracionTotal, setDuracionTotal] = useState(0);
  const [promedio, setPromedio] = useState(0);

  

  async function pedirLlamadasAlServidor(cantidad) {
    try {
      const respuesta = await fetch(`http://localhost:3000/generar-telefonos/${cantidad}`);
      const datos = await respuesta.json();
      console.log(datos)
      setLlamadas(datos);

      calcularPromedioYtotal(datos);
    } catch (error) {
      console.error('Error al obtener llamadas del servidor:', error);
    }
  }

  function calcularPromedioYtotal(llamadasGeneradas) {
    if (!Array.isArray(llamadasGeneradas)) {
      console.error("⚠️ Esto no es un array:", llamadasGeneradas);
      return;
    }
    try {
      const total = llamadasGeneradas.reduce((acc, llamada) => acc + parseInt(llamada.duracionDeLlamada), 0);
      const promedio = total / llamadasGeneradas.length;
 
      setDuracionTotal(total); 
      setPromedio(promedio)
     }catch (error) {
     console.error("Esto no es un array:", llamadasGeneradas);
   }
  }
  


  return (
    <div className="max-w-[1280px] mx-auto p-8 text-center grid justify-items-center bg-[#d1c6d8] font-sans min-h-screen">
      <section className="mb-5">
        <h2 className="text-2xl font-semibold mb-2">Registro de llamadas</h2>
        <p className="mb-4">Ingresa el número de llamadas que quieras generar.</p>
  
        <input
          type="text"
          value={valor}
          onChange={(e) => setValor(Number(e.target.value))}
          className="border border-purple-400 rounded px-2 py-1 mr-2 w-[160px] h-[30px]"
        />
  
        <button
          onClick={() => pedirLlamadasAlServidor(valor)}
          className="bg-[#baacc4] border border-purple-600 rounded px-4 py-1 cursor-pointer hover:bg-purple-200 transition">
          Generar
        </button>
      </section>
  
      {llamadas.length > 0 && <ManejoDeLlamadas llamadas={llamadas} calcularPromedioYtotal={calcularPromedioYtotal}  />}

  
      {duracionTotal > 0 && promedio > 0 && (
        <section className="mt-6 text-lg">
          <p className="mb-2">Duración total: {duracionTotal} seg</p>
          <p>Promedio de segundos por cada llamada: {promedio.toFixed(2)}</p>
        </section>
      )}
    </div>
  );  
}


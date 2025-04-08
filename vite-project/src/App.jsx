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

      setLlamadas(datos);

      calcularPromedioYtotal(datos);
    } catch (error) {
      console.error('Error al obtener llamadas del servidor:', error);
    }
  }

  function calcularPromedioYtotal(llamadasGeneradas) {
    const total = llamadasGeneradas.reduce((acc, llamada) => acc + llamada.duracionDeLlamada, 0);
    setDuracionTotal(total);
    setPromedio(total / llamadasGeneradas.length || 0);
  }


  return (
    <>
      <section className="pedirNumero">
        <h2>Registro de llamadas</h2>
        <p>Ingresa el numero de llamadas que quieras generar.</p>
        <input
          type="text"
          value={valor}
          onChange={(e) => setValor(Number(e.target.value))}
        />
        <button onClick={() => pedirLlamadasAlServidor(valor)}>Generar</button>
      </section>
      {llamadas.length > 0 && <ManejoDeLlamadas llamadas={llamadas} />}
      {duracionTotal >0 && promedio > 0 && <section className="mostrarPromedioYTotal">
        <p>Duración total: {duracionTotal} seg</p>
        <p>Promedio de segundos por cada llamada: {promedio.toFixed(2)}</p>
      </section>}
    
    </>
  );
}


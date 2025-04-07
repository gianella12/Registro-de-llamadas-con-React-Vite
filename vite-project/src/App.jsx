import { useState } from 'react';
import { ManejoDeLlamadas } from './sistemaDeGestion';

export const App = () => {
  const [valor, setValor] = useState('');
  const [llamadas, setLlamadas] = useState([]);
  const [duracionTotal, setDuracionTotal] = useState(0);
  const [promedio, setPromedio] = useState(0);

  

  function generarLlamadas(cantidad) {
    const nuevasLlamadas = [];
    let nuevaDuracionTotal = 0;

    for (let i = 0; i < cantidad; i++) {
      let destino = Math.floor(Math.random() * (9999999999 - 1111111111) + 1111111111);
      let origen = Math.floor(Math.random() * (9999999999 - 1111111111) + 1111111111);
      let duracionDeLlamada = Math.floor(Math.random() * (600 - 30 + 1) + 30);

      nuevasLlamadas.push({ origen, destino, duracionDeLlamada });
      nuevaDuracionTotal += duracionDeLlamada;
    }

    setLlamadas(nuevasLlamadas);
    calcularPromedioYtotal(nuevaDuracionTotal,nuevasLlamadas)
  }
  function  calcularPromedioYtotal (nuevaDuracionTotal, nuevasLlamadas) {
    setDuracionTotal(nuevaDuracionTotal);
    setPromedio(nuevaDuracionTotal / nuevasLlamadas.length || 0);  
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
        <button onClick={() => generarLlamadas(valor)}>Generar</button>
      </section>
      {llamadas.length > 0 && <ManejoDeLlamadas llamadas={llamadas} />}
      {duracionTotal >0 && promedio > 0 && <section className="mostrarPromedioYTotal">
        <p>Duración total: {duracionTotal} seg</p>
        <p>Promedio de segundos por cada llamada: {promedio.toFixed(2)}</p>
      </section>}
    
    </>
  );
}


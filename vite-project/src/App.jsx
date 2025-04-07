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
    calcularPromedioYtotal(nuevaDuracionTotal,nuevasLlamadas,setDuracionTotal,setPromedio)
  }
  return (
    <>
      <section className="pedirNumero">
        <h2>Registro de llamadas</h2>
        <input
          type="text"
          value={valor}
          onChange={(e) => setValor(Number(e.target.value))}
        />
        <button onClick={() => generarLlamadas(valor)}>Generar</button>
      </section>
      <ManejoDeLlamadas llamadas={llamadas} />
      <section className="mostrarPromedioYTotal">
        <p>Duración total: {duracionTotal} segundos</p>
        <p>Promedio de segundos por cada llamada: {promedio.toFixed(2)}</p>
      </section>
    
    </>
  );
}
const  calcularPromedioYtotal = (nuevaDuracionTotal, nuevasLlamadas, setDuracionTotal, setPromedio) => {
    setDuracionTotal(nuevaDuracionTotal);
    setPromedio(nuevaDuracionTotal / nuevasLlamadas.length || 0);
  
}

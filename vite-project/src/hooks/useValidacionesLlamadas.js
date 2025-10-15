import { useState } from 'react';

export function useValidacionLlamada() {
  const [numeroInvalido, setNumeroInvalido] = useState({});

  const [valoresEditados, setValoresEditados] = useState({
  origen: '',
  destino: '',
  duracion: '',
});

  function manejarCambio(evento, campo) {
    const valorNuevo = evento.target.value;

    
    if (campo === "duracion") {
      if (valorNuevo > 29 && valorNuevo <= 600) {
        setNumeroInvalido((estadoPrevio) => ({
          ...estadoPrevio,
          [campo]: false,
        }));
        setValoresEditados((prev) => ({
          ...prev,
          [campo]: valorNuevo,
        }));
      } else {
        setNumeroInvalido((estadoPrevio) => ({
          ...estadoPrevio,
          [campo]: true,
        }));
      }
      return;
    }

   
    if (valorNuevo.length !== 10) {
      setNumeroInvalido((estadoPrevio) => ({
        ...estadoPrevio,
        [campo]: true,
      }));
      return;
    }

    setNumeroInvalido((estadoPrevio) => ({
      ...estadoPrevio,
      [campo]: false,
    }));
    setValoresEditados((prev) => ({
      ...prev,
      [campo]: valorNuevo,
    }));
  }

  

  return {
    numeroInvalido,
    valoresEditados,
    manejarCambio,
    setValoresEditados
  };
}
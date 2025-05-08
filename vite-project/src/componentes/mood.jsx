import { useEffect, useState } from 'react';

export default function Mood({ posicion = "izquierda" }) {
  const [oscuro, setOscuro] = useState(false);

  useEffect(() => {
    const temaGuardado = localStorage.getItem("tema");
    if (temaGuardado === "oscuro") {
      setOscuro(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (oscuro) {
      document.documentElement.classList.add('dark');
      localStorage.setItem("tema", "oscuro");
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem("tema", "claro");
    }
  }, [oscuro]);

  const clasePosicion = posicion === "derecha"
    ? "fixed top-0 right-0"
    : "fixed top-0 left-0";


  return (
    <button
      onClick={() => setOscuro(!oscuro)}
      className={`${clasePosicion} p-2 rounded bg-gray-200 dark:bg-gray-700`}
    >
      {oscuro ? '☀️' : '🌙 '}
    </button>
  );
}
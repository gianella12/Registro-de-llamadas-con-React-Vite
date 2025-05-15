import { useValidacionLlamada } from "./hooks/useValidacionesllamadas";

export const NuevaSeccion = ({ setMostrarNuevaSeccion,setLlamadas }) => {
    const {
    numeroInvalido,
    valoresEditados,
    manejarCambio,
  } = useValidacionLlamada();

  const habilitarBoton = 
   Object.values(valoresEditados).every(valor => valor !== '' && !isNaN(Number(valor))) &&
  Object.values(numeroInvalido).every(invalido => !invalido);
  
    async function enviarDatosAlServidor(datosEditados) {
        try {
            const respuesta = await fetch(`http://localhost:3000/insertar-registro`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    datosEditados: {
                        origen: Number(datosEditados.origen),
                        destino: Number(datosEditados.destino),
                        duracion: Number(datosEditados.duracion)
                    }
                }),
            });
            const resultado = await respuesta.json();
            setLlamadas(resultado);


        } catch (error) {
            console.log("hay un error")
        }
    }

    function registroTerminado() {
        enviarDatosAlServidor(valoresEditados)
        setMostrarNuevaSeccion(false);

    }

return (
    <>
        <div className="mb-8 px-4 w-full max-w-md mx-auto space-y-4">
            
            <div className="flex flex-col">
                <label className="text-sm font-semibold mb-1">Destino</label>
                <input
                    type="number"
                    placeholder="Ingrese destino"
                    className="w-full bg-white text-black dark:bg-[#1a1a1a] dark:text-white border border-gray-400 rounded px-3 py-2"
                    onChange={(e) => manejarCambio(e, "destino")}
                />
                {numeroInvalido["destino"] && (
                    <p className="text-red-500 text-sm mt-1">El número es inválido</p>
                )}
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-semibold mb-1">Origen</label>
                <input
                    type="number"
                    placeholder="Ingrese origen"
                    className="w-full bg-white text-black dark:bg-[#1a1a1a] dark:text-white border border-gray-400 rounded px-3 py-2"
                    onChange={(e) => manejarCambio(e, "origen")}
                />
                {numeroInvalido["origen"] && (
                    <p className="text-red-500 text-sm mt-1">El número es inválido</p>
                )}
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-semibold mb-1">Duración</label>
                <input
                    type="number"
                    placeholder="Ingrese duración"
                    className="w-full bg-white text-black dark:bg-[#1a1a1a] dark:text-white border border-gray-400 rounded px-3 py-2"
                    onChange={(e) => manejarCambio(e, "duracion")}
                />
                {numeroInvalido["duracion"] && (
                    <p className="text-red-500 text-sm mt-1">El número es inválido</p>
                )}
            </div>
        </div>

        <div className="flex flex-col items-center gap-4 px-4 sm:flex-row sm:justify-center">
            <button
                onClick={() => registroTerminado()}
                disabled={!habilitarBoton}
                className={`bg-[#8a75a8] border border-purple-800 rounded px-4 py-2 transition text-white shadow-md 
                ${!habilitarBoton ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-400 cursor-pointer'}`}
            >
                Aceptar
            </button>

        </div>
    </>
);}
import { useState } from "react";
import Mood from "./componentes/mood";

export const NuevaSeccion = ({ setMostrarNuevaSeccion, setLlamadas }) => {
    const [numeroInvalido, setNumeroInvalido] = useState({
        origen: true,
        destino: true,
        duracion: true
    });
    const [valoresEditados, setValoresEditados] = useState({});

    function manejarCambio(event, campo) {
        const nuevoValor = event.target.value;

        if (campo === "duracion") {
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

        if (nuevoValor.length < 10 || nuevoValor.length > 10) {
            setNumeroInvalido((estadoAnterior) => ({
                ...estadoAnterior,
                [campo]: true,
            }));
            return;
        }

        setNumeroInvalido((estadoAnterior) => ({
            ...estadoAnterior,
            [campo]: false,
        }));
        setValoresEditados({
            ...valoresEditados,
            [campo]: nuevoValor,
        });
    }
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
    function atras() {
        setMostrarNuevaSeccion(false);
    }
    const hayErrores = Object.values(numeroInvalido).some((invalido) => invalido);
    return (
        <>
            <div className=" mb-8">
               <Mood posicion="derecha" />
                <table className="border border-[#f0eaff] bg-[#c78ce9] shadow-lg rounded-lg overflow-hidden w-full max-w-md mx-auto table-auto ">
                    <thead>
                        <tr>
                            <th className="border border-black p-2 text-left bg-[#c78ce9]">Destino</th>
                            <th className="border border-black p-2 text-left bg-[#c78ce9]">Origen</th>
                            <th className="border border-black p-2 text-left bg-[#c78ce9]">Duración</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-black p-2 text-left">
                                <input type="text" placeholder="Ingrese destino" className="bg-white text-black dark:bg-[#1a1a1a] dark:text-white border border-gray-400 rounded px-2 py-1"
                                    onChange={(e) => manejarCambio(e, "destino")} />
                                {numeroInvalido["destino"] && <p className="text-red-500">El número es inválido</p>}
                            </td>
                            <td className="border border-black p-2 text-left">
                                <input type="text" placeholder="Ingrese origen" className="bg-white text-black dark:bg-[#1a1a1a] dark:text-white border border-gray-400 rounded px-2 py-1"
                                    onChange={(e) => manejarCambio(e, "origen")} />
                                {numeroInvalido["origen"] && <p className="text-red-500">El número es inválido</p>}
                            </td>
                            <td className="border border-black p-2 text-left">
                                <input type="number" placeholder="Ingrese duración" className="bg-white text-black dark:bg-[#1a1a1a] dark:text-white border border-gray-400 rounded px-2 py-1"
                                    onChange={(e) => manejarCambio(e, "duracion")} />
                                {numeroInvalido["duracion"] && <p className="text-red-500">El número es inválido</p>}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <button
                onClick={() => registroTerminado()}
                disabled={hayErrores}
                className={`bg-[#8a75a8] border border-purple-800 rounded px-4 py-2 transition text-white shadow-md 
                ${hayErrores ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-400 cursor-pointer'}`}
            >
                Aceptar
            </button>

            <button onClick={() => atras()} className="absolute top-4 left-4 bg-[#8a75a8] border border-purple-800 rounded px-4 py-2 cursor-pointer hover:bg-purple-400 transition text-white shadow-md">
                <i className="bi bi-box-arrow-left"></i>
            </button>
        </>
    )
}
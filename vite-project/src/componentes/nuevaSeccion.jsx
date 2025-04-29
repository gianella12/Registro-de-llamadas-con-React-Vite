import { useState } from "react";

export const NuevaSeccion = ({ setMostrarNuevaSeccion, llamadas, setLlamadas }) => {
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

        if (nuevoValor.length === 10) {
            setNumeroInvalido((estadoAnterior) => ({
                ...estadoAnterior,
                [campo]: false,
            }));

            setValoresEditados({
                ...valoresEditados,
                [campo]: nuevoValor,
            });
        }
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
            <div className="mt-8 mb-8">
                <table className="table-auto max-w-[600px] border-collapse mx-auto">
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
                                <input type="text" placeholder="Ingrese destino" className="w-full px-2 py-1 border rounded" onChange={(e) => manejarCambio(e, "destino")} />
                                {numeroInvalido["destino"] && <p className="text-red-500">El número es inválido</p>}
                            </td>
                            <td className="border border-black p-2 text-left">
                                <input type="text" placeholder="Ingrese origen" className="w-full px-2 py-1 border rounded" onChange={(e) => manejarCambio(e, "origen")} />
                                {numeroInvalido["origen"] && <p className="text-red-500">El número es inválido</p>}
                            </td>
                            <td className="border border-black p-2 text-left">
                                <input type="number" placeholder="Ingrese duración" className="w-full px-2 py-1 border rounded" onChange={(e) => manejarCambio(e, "duracion")} />
                                {numeroInvalido["duracion"] && <p className="text-red-500">El número es inválido</p>}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {/* <button onClick={() => registroTerminado()} className="bg-[#8a75a8] border border-purple-800 rounded px-4 py-2 cursor-pointer hover:bg-purple-400 transition text-white shadow-md">
            Aceptar
            </button> */}
            <button
                onClick={() =>registroTerminado()}
                disabled={hayErrores}
                className={`bg-[#8a75a8] border border-purple-800 rounded px-4 py-2 cursor-pointer transition text-white shadow-md 
                ${hayErrores ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-400'}`}
            >
                Aceptar
            </button>
            <button onClick={() => atras()} className="bg-[#8a75a8] border border-purple-800 rounded px-4 py-2 cursor-pointer hover:bg-purple-400 transition text-white shadow-md">
                Atras
            </button>
        </>
    )
}
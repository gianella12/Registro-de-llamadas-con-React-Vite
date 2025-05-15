export default function TarjetasLlamadas({ llamadas,pasarDatosBorrar }) {
    return (
        <div className="block sm:hidden space-y-4">
            {llamadas.map((llamada, index) => (
                <div key={index} className="bg-[#c78ce9] p-4 rounded-lg shadow border mx-2">
                    <p><span className="font-bold">Origen:</span> {llamada.origen}</p>
                    <p><span className="font-bold">Destino:</span> {llamada.destino}</p>
                    <p><span className="font-bold">Duración:</span> {llamada.duracion}</p>

                    <div className="flex flex-col gap-2 mt-2">
                        
                        <button className="bg-[#baacc4] border border-purple-600 rounded px-4 py-1 hover:bg-purple-200 transition"
                            onClick={() => {
                               pasarDatosBorrar(llamada.id_llamada)
                            }}>
                            Eliminar
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
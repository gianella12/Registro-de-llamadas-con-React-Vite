export const NuevaSeccion = () => {


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
                                <input type="text" placeholder="Ingrese destino" className="w-full px-2 py-1 border rounded" />
                            </td>
                            <td className="border border-black p-2 text-left">
                                <input type="text" placeholder="Ingrese origen" className="w-full px-2 py-1 border rounded" />
                            </td>
                            <td className="border border-black p-2 text-left">
                                <input type="number" placeholder="Ingrese duración" className="w-full px-2 py-1 border rounded" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}
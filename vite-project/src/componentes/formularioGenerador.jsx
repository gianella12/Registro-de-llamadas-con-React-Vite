export default function FormularioGenerador({ valor, setValor, generando, pedirLlamadas }) {
  return (
    <div className="px-4 w-full max-w-md mx-auto mb-6">
      <h2 className="text-2xl font-semibold mb-2">Registro de llamadas</h2>
      <p className="mb-4">Ingresa el número de llamadas que quieras generar.</p>

      <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
        <input
          type="text"
          value={valor}
          onChange={(e) => setValor(Number(e.target.value))}
          className="border border-purple-400 dark:border-purple-600 rounded px-2 py-1 mr-2 w-[160px] h-[30px] bg-white dark:bg-gray-800 text-black dark:text-white"
        />

        <button
          onClick={() => pedirLlamadas(valor)}
          disabled={generando}
          className="bg-[#baacc4] dark:bg-purple-600 border border-purple-600 dark:border-purple-400 rounded px-4 py-1 cursor-pointer hover:bg-purple-200 dark:hover:bg-purple-500 transition text-black dark:text-white"
        >
          Generar
        </button>
      </div>
    </div>
  )
};
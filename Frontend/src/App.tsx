import { useState } from 'react'

function App() {
    const [count, setCount] = useState(0)

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
                <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
                    Sistema de Inventario
                </h1>
                <p className="text-gray-600 text-center mb-6">
                    Entorno de desarrollo configurado con React + TypeScript + Vite + Tailwind CSS
                </p>

                <div className="flex flex-col items-center gap-4">
                    <button
                        onClick={() => setCount((count) => count + 1)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                    >
                        Contador: {count}
                    </button>

                    <div className="text-sm text-gray-500 text-center">
                        <p>Edita <code className="bg-gray-100 px-2 py-1 rounded">src/App.tsx</code> para comenzar</p>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-700 mb-3">Tecnologías:</h2>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            React 18 con TypeScript
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                            Vite para desarrollo rápido
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
                            Tailwind CSS para estilos
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default App

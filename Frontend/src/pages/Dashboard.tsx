// src/pages/Dashboard.tsx
import { useNavigate } from 'react-router-dom'; // <-- 1. Importamos el gancho de navegación
import { StatCard } from '../components/dashboard/StatCard';
import { RightPanel } from '../components/dashboard/RightPanel';

export function Dashboard() {
    const navigate = useNavigate(); // <-- 2. Lo inicializamos

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

            {/* COLUMNA IZQUIERDA (3 espacios) */}
            <div className="lg:col-span-3 space-y-8">

                {/* 1. Tarjetas con VALORES EN CERO pero DISEÑO COLORIDO */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <StatCard
                        title="Ventas Hoy"
                        amount="S/ 0.00"
                        items="0 ventas"
                        iconPath="/icons/venta.svg"
                        color="text-gray-300"
                        bgColor="bg-green-100"
                        onAction={() => navigate('/ventas')} // <-- Viaja a Ventas
                    />
                    <StatCard
                        title="Ganancia Mes"
                        amount="S/ 0.00"
                        items="Sin datos"
                        iconPath="/icons/ganancias.svg"
                        color="text-gray-300"
                        bgColor="bg-blue-100"
                        onAction={() => navigate('/ganancia')} // <-- Viaja a Ganancia
                    />
                    <StatCard
                        title="Stock Bajo"
                        amount="0"
                        items="Todo en orden"
                        iconPath="/icons/alerta.svg"
                        color="text-gray-300"
                        bgColor="bg-orange-100"
                        onAction={() => navigate('/inventario', { state: { filterStatus: 'Bajo Stock' } })} // <-- Viaja a Inventario filtrado
                    />
                    <StatCard
                        title="Total Fiados"
                        amount="S/ 0.00"
                        items="0 pendientes"
                        iconPath="/icons/fiado.svg"
                        color="text-gray-300"
                        bgColor="bg-amber-100"
                        onAction={() => alert('Fiados en construcción 🚧')} // <-- Alerta temporal
                    />
                </div>

                {/* 2. Tabla de Ventas Recientes (VACÍA) */}
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 min-h-[350px]">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="font-bold text-gray-800 text-2xl">Últimas Ventas</h3>
                        <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">Hoy</span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                            <tr className="border-b border-gray-100 text-gray-400 text-sm uppercase tracking-wider">
                                <th className="py-4 font-semibold pl-4">Hora</th>
                                <th className="py-4 font-semibold">Total</th>
                                <th className="py-4 font-semibold">Método</th>
                                <th className="py-4 text-right font-semibold pr-4">Estado</th>
                            </tr>
                            </thead>
                            <tbody className="text-sm">
                            {/* FILA DE MENSAJE VACÍO */}
                            <tr>
                                <td colSpan={4} className="py-20 text-center">
                                    <div className="flex flex-col items-center justify-center opacity-50">
                                        <div className="bg-gray-50 p-4 rounded-full mb-3">
                                            <img src="/icons/venta.svg" className="w-8 h-8 opacity-30 grayscale" alt="vacio" />
                                        </div>
                                        <p className="text-gray-500 font-bold text-lg">No hay ventas registradas hoy</p>
                                        <p className="text-gray-400 text-sm mt-1">El sistema está esperando tu primera venta.</p>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* COLUMNA DERECHA (1 espacio) - Panel Derecho */}
            <div className="lg:col-span-1">
                <RightPanel />
            </div>

        </div>
    );
}
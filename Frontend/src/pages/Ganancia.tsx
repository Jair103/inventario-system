// src/pages/Ganancia.tsx
import { useState } from 'react';
import { ExpenseModal } from '../components/ganancia/ExpenseModal'; // <--- 1. IMPORTAR

export function Ganancia() {
    const [activeFilter, setActiveFilter] = useState('Hoy');

    // 2. ESTADO PARA EL MODAL DE GASTOS
    const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

    const getButtonClass = (filterName: string) => {
        return activeFilter === filterName
            ? "px-5 py-2 bg-black text-white rounded-lg text-sm font-bold shadow-md transition"
            : "px-5 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-sm font-medium transition";
    };

    return (
        <div className="space-y-6">

            {/* 3. COLOCAR EL MODAL AQUÍ (Invisible por defecto) */}
            <ExpenseModal
                isOpen={isExpenseModalOpen}
                onClose={() => setIsExpenseModalOpen(false)}
            />

            {/* HEADER */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex bg-white rounded-xl p-1 shadow-sm border border-gray-200">
                    <button onClick={() => setActiveFilter('Hoy')} className={getButtonClass('Hoy')}>Hoy</button>
                    <button onClick={() => setActiveFilter('Este mes')} className={getButtonClass('Este mes')}>Este mes</button>
                    <button onClick={() => setActiveFilter('Rango')} className={getButtonClass('Rango')}>Rango de Fechas</button>
                </div>
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl text-sm font-bold hover:bg-gray-200 transition flex items-center gap-2 border border-gray-200">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    Exportar Reporte
                </button>
            </div>

            {/* TARJETAS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* Ganancia Neta */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
                    <p className="text-gray-500 font-bold text-xs uppercase tracking-wider">Ganancia Neta (Mes)</p>
                    <p className="text-3xl font-semibold text-green-500 mt-2 tracking-tight">S/ 0.00</p>
                </div>

                {/* Margen */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
                    <p className="text-gray-500 font-bold text-xs uppercase tracking-wider">Margen Promedio (%)</p>
                    <p className="text-3xl font-semibold text-green-500 mt-2 tracking-tight">0%</p>
                </div>

                {/* Gasto (Con botón funcional) */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-red-50 rounded-bl-full -mr-8 -mt-8"></div>
                    <p className="text-gray-500 font-bold text-xs uppercase tracking-wider">Gasto en Compras</p>
                    <p className="text-3xl font-semibold text-red-500 mt-2 tracking-tight">S/ 0.00</p>

                    {/* 4. AGREGAR EL ONCLICK AL BOTÓN */}
                    <button
                        onClick={() => setIsExpenseModalOpen(true)}
                        className="mt-4 bg-black text-white text-xs px-4 py-2 rounded-lg font-bold hover:bg-gray-800 transition shadow-lg"
                    >
                        Registrar Gasto
                    </button>
                </div>

                {/* Valor Inventario */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
                    <p className="text-gray-500 font-bold text-xs uppercase tracking-wider">Valor del Inventario</p>
                    <p className="text-3xl font-semibold text-blue-500 mt-2 tracking-tight">S/ 0.00</p>
                </div>
            </div>

            {/* RESTO DE LA PÁGINA (Gráfico y Paneles) - IGUAL QUE ANTES */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-96 flex flex-col">
                    <h3 className="font-bold text-gray-800 mb-6 text-lg">Costo vs. Venta por Día</h3>
                    <div className="flex-1 flex flex-col items-center justify-center opacity-40 border-2 border-dashed border-gray-100 rounded-xl bg-gray-50">
                        <div className="bg-white p-4 rounded-full mb-3 shadow-sm">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                        </div>
                        <p className="text-gray-500 font-bold">No hay datos financieros</p>
                        <p className="text-xs text-gray-400 mt-1 text-center max-w-xs">Tus métricas de costos vs ganancias aparecerán aquí cuando registres actividad.</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[200px] flex flex-col">
                        <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wide">Top 5 Productos Rentables</h3>
                        <div className="flex-1 flex items-center justify-center text-center opacity-50">
                            <p className="text-xs text-gray-400 italic">Necesitas más ventas para calcular esto.</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[200px] flex flex-col">
                        <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wide">Productos Sin Movimiento</h3>
                        <div className="flex-1 flex items-center justify-center text-center">
                            <div className="flex flex-col items-center">
                                <span className="text-2xl mb-2">📦</span>
                                <p className="text-xs text-gray-400">Todo tu inventario está activo.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
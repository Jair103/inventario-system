// src/pages/Ventas.tsx
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// OJO AQUÍ: Importamos desde 'ventas'
import { TicketModal } from '../components/ventas/TicketModal';

export function Ventas() {
    const [activeFilter, setActiveFilter] = useState('Hoy');
    const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState<any>(null);

    // Datos vacíos
    const data: any[] = [];
    const transactions: any[] = [];

    const getButtonClass = (filterName: string) => {
        return activeFilter === filterName
            ? "bg-black text-white px-6 py-2 rounded-xl font-bold text-sm shadow-md transition"
            : "bg-white text-gray-700 border border-gray-200 px-6 py-2 rounded-xl font-bold text-sm hover:bg-gray-50 transition";
    };

    const handleOpenTicket = (ticket: any) => {
        setSelectedTicket(ticket);
        setIsTicketModalOpen(true);
    };

    return (
        <div className="space-y-8">

            {/* Modal Conectado */}
            <TicketModal
                isOpen={isTicketModalOpen}
                onClose={() => setIsTicketModalOpen(false)}
                ticket={selectedTicket}
            />

            {/* FILTROS */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex gap-2">
                    <button onClick={() => setActiveFilter('Hoy')} className={getButtonClass('Hoy')}>Hoy</button>
                    <button onClick={() => setActiveFilter('Semana')} className={getButtonClass('Semana')}>Semana</button>
                    <button onClick={() => setActiveFilter('Mes')} className={getButtonClass('Mes')}>Mes</button>
                </div>
                <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 font-medium">Desde:</span>
                        <input type="date" className="border border-gray-200 rounded-lg px-3 py-2 text-gray-600 focus:ring-2 focus:ring-black outline-none" />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 font-medium">Hasta:</span>
                        <input type="date" className="border border-gray-200 rounded-lg px-3 py-2 text-gray-600 focus:ring-2 focus:ring-black outline-none" />
                    </div>
                </div>
            </div>

            {/* GRÁFICO VACÍO */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-80 w-full flex flex-col justify-center items-center relative">
                {data.length === 0 ? (
                    <div className="flex flex-col items-center justify-center opacity-50">
                        <div className="bg-gray-50 p-4 rounded-full mb-3">
                            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
                        </div>
                        <p className="text-gray-500 font-medium">No hay datos de ventas para este periodo</p>
                        <p className="text-xs text-gray-400 mt-1">Realiza tu primera venta para ver estadísticas.</p>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                            <Line type="monotone" dataKey="ventas" stroke="#000000" strokeWidth={3} dot={{ r: 4, fill: '#000000', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </div>

            {/* TABLA HISTORIAL */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Historial de Ventas</h3>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                        <tr className="bg-gray-50 text-gray-500 text-xs uppercase font-bold">
                            <th className="px-4 py-4 rounded-l-xl">Hora</th>
                            <th className="px-4 py-4">Boleto #</th>
                            <th className="px-4 py-4">Cliente</th>
                            <th className="px-4 py-4">Método</th>
                            <th className="px-4 py-4">Total (S/)</th>
                            <th className="px-4 py-4 text-center">Estado</th>
                            <th className="px-4 py-4 rounded-r-xl"></th>
                        </tr>
                        </thead>
                        <tbody className="text-sm">
                        {transactions.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="py-16 text-center">
                                    <div className="flex flex-col items-center justify-center opacity-60">
                                        <div className="bg-gray-50 p-4 rounded-full mb-3 border border-gray-100">
                                            <img src="/icons/list.svg" className="w-8 h-8 opacity-30 grayscale" alt="vacio" />
                                        </div>
                                        <h3 className="text-gray-600 font-bold text-sm">Sin movimientos recientes</h3>
                                        <p className="text-gray-400 text-xs mt-1">Las ventas del día aparecerán aquí.</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            transactions.map((t, index) => (
                                <tr key={index} className="border-b border-gray-50 hover:bg-gray-50 transition">
                                    <td className="px-4 py-4 font-medium text-gray-600">{t.hora}</td>
                                    <td className="px-4 py-4 font-bold text-gray-800">{t.boleto}</td>
                                    <td className="px-4 py-4 text-gray-600">{t.cliente}</td>
                                    <td className="px-4 py-4 text-gray-600">{t.metodo}</td>
                                    <td className="px-4 py-4 font-bold text-gray-800">{t.total.toFixed(2)}</td>
                                    <td className="px-4 py-4 text-center">
                                 <span className={`px-3 py-1 rounded-full text-xs font-bold border ${t.estado === 'Pagado' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'}`}>
                                    {t.estado}
                                 </span>
                                    </td>
                                    <td className="px-4 py-4 text-right">
                                        <button
                                            onClick={() => handleOpenTicket(t)}
                                            className="text-gray-400 hover:text-black font-medium text-xs transition"
                                        >
                                            Ver detalle
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
// src/components/ganancia/ExpenseModal.tsx
import { useEffect } from 'react';

interface ExpenseModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ExpenseModal({ isOpen, onClose }: ExpenseModalProps) {

    // Bloquear el scroll del fondo cuando se abre
    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm p-4 animate-fade-in">

            {/* Contenedor del Modal */}
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up transform transition-all">

                {/* Encabezado */}
                <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-900">Registrar Nuevo Gasto</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                {/* Formulario */}
                <div className="p-6 space-y-5">

                    {/* Campo: Monto */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Monto (S/)</label>
                        <input
                            type="number"
                            placeholder="0.00"
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-lg font-medium focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                            autoFocus
                        />
                    </div>

                    {/* Campo: Descripción */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Descripción</label>
                        <input
                            type="text"
                            placeholder="Ej. Pago de luz"
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                        />
                    </div>

                    {/* Campo: Categoría */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Categoría</label>
                        <div className="relative">
                            <select className="w-full border border-gray-200 rounded-xl px-4 py-3 appearance-none bg-white focus:ring-2 focus:ring-black focus:border-transparent outline-none transition cursor-pointer">
                                <option>Servicios (Luz, Agua, Internet)</option>
                                <option>Personal (Sueldos, Adelantos)</option>
                                <option>Mantenimiento y Reparaciones</option>
                                <option>Insumos y Limpieza</option>
                                <option>Impuestos y Trámites</option>
                                <option>Otros Gastos</option>
                            </select>
                            {/* Flechita personalizada */}
                            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </div>
                        </div>
                    </div>

                    {/* Campo: Fecha */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Fecha</label>
                        <input
                            type="date"
                            defaultValue={new Date().toISOString().split('T')[0]} // Fecha de hoy por defecto
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-600 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                        />
                    </div>

                </div>

                {/* Footer Botones */}
                <div className="px-6 py-5 bg-gray-50 flex justify-end gap-3 border-t border-gray-100">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 rounded-xl font-bold text-gray-600 bg-gray-200 hover:bg-gray-300 transition text-sm"
                    >
                        Cancelar
                    </button>
                    <button className="px-5 py-2.5 rounded-xl font-bold text-white bg-black hover:bg-gray-800 shadow-lg hover:shadow-xl transition text-sm transform hover:-translate-y-0.5">
                        Guardar Gasto
                    </button>
                </div>

            </div>
        </div>
    );
}
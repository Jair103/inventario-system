// src/components/ventas/TicketModal.tsx
import { useEffect } from 'react';

interface TicketModalProps {
    isOpen: boolean;
    onClose: () => void;
    ticket: any;
}

export function TicketModal({ isOpen, onClose, ticket }: TicketModalProps) {

    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-white w-full max-w-3xl shadow-2xl rounded-xl overflow-hidden animate-fade-in-up">

                {/* ENCABEZADO */}
                <div className="bg-gray-100 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-200">
                    <div>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-wide">Ticket ID</p>
                        <p className="text-xl font-bold text-gray-800">{ticket?.boleto || "#00000"}</p>
                    </div>
                    <div>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-wide">Fecha</p>
                        <p className="text-gray-800 font-medium">2023-10-15 {ticket?.hora}</p>
                    </div>
                    <div>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-wide">Cliente</p>
                        <p className="text-gray-800 font-medium">{ticket?.cliente || "Cliente General"}</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                {/* TABLA DETALLE */}
                <div className="p-8">
                    <table className="w-full text-left">
                        <thead>
                        <tr className="text-sm font-bold text-gray-800 border-b-2 border-gray-100">
                            <th className="py-3 w-16">Cant.</th>
                            <th className="py-3">Producto</th>
                            <th className="py-3 text-right">P. Unit</th>
                            <th className="py-3 text-right">Total</th>
                        </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm">
                        <tr className="border-b border-gray-50">
                            <td className="py-4 font-bold">2</td>
                            <td className="py-4">Manzanas orgánicas</td>
                            <td className="py-4 text-right">S/. 3.50</td>
                            <td className="py-4 text-right font-medium">S/. 7.00</td>
                        </tr>
                        <tr className="border-b border-gray-50">
                            <td className="py-4 font-bold">1</td>
                            <td className="py-4">Pan Integral</td>
                            <td className="py-4 text-right">S/. 2.50</td>
                            <td className="py-4 text-right font-medium">S/. 2.50</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                {/* PIE Y TOTALES */}
                <div className="bg-gray-50 p-6 border-t border-gray-100">
                    <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4 text-sm">
                        <div className="text-gray-500">Subtotal: <span className="font-bold text-gray-800">S/. 9.50</span></div>
                        <div className="text-gray-500">IGV (18%): <span className="font-bold text-gray-800">S/. 1.71</span></div>
                        <div className="text-xl font-bold text-gray-800">Total: <span className="text-black">S/. 11.21</span></div>
                    </div>

                    <div className="flex justify-end gap-3">
                        <button className="bg-black text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg hover:bg-gray-800 transition flex items-center gap-2">
                            Imprimir Copia
                        </button>
                        <button className="bg-green-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg hover:bg-green-700 transition flex items-center gap-2">
                            WhatsApp
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
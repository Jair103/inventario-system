// src/components/inventory/ProductTable.tsx
import { Product } from '../../types/product';

interface ProductTableProps {
    products: Product[];
    onDelete: (id: number) => void; // <--- NUEVO: Función para eliminar
    onEdit: (product: Product) => void; // <--- NUEVO: Función para editar
}

export function ProductTable({ products, onDelete, onEdit }: ProductTableProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left whitespace-nowrap">
                    <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Código</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Producto</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Categoría</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Stock</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Costo</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Precio Venta</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Status</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Acciones</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">

                    {products.length === 0 ? (
                        <tr>
                            <td colSpan={8} className="py-24 text-center">
                                <div className="flex flex-col items-center justify-center opacity-60">
                                    <div className="bg-gray-50 p-4 rounded-full mb-3 border border-gray-100">
                                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                                    </div>
                                    <h3 className="text-gray-600 font-bold text-lg">No hay productos</h3>
                                    <p className="text-gray-400 text-sm mt-1 max-w-xs">Tu inventario está vacío. Agrega tu primer producto.</p>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        products.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-sm text-gray-500">{product.codigo}</td>

                                {/* AQUI ESTÁ LA MINIATURA DE LA IMAGEN */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-lg shadow-sm overflow-hidden">

                                            {/* NUEVA LÓGICA: Si hay imagen, la mostramos. Si no, mostramos la cajita */}
                                            {product.imagen ? (
                                                <img src={product.imagen} alt={product.nombre} className="w-full h-full object-contain p-1 bg-white" />
                                            ) : (
                                                '📦'
                                            )}

                                        </div>
                                        <span className="text-sm font-bold text-gray-900">{product.nombre}</span>
                                    </div>
                                </td>

                                <td className="px-6 py-4 text-sm text-gray-500">
                                    <span className="bg-gray-100 px-3 py-1 rounded-lg text-xs font-medium">{product.categoria}</span>
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">{product.stock} un.</td>
                                <td className="px-6 py-4 text-sm text-gray-500">S/ {product.costo.toFixed(2)}</td>
                                <td className="px-6 py-4 text-sm font-bold text-green-600">S/ {product.precioVenta.toFixed(2)}</td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                                        product.status === 'En Stock' ? 'bg-green-50 text-green-700 border-green-200' :
                                            product.status === 'Bajo Stock' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                                'bg-red-50 text-red-700 border-red-200'
                                    }`}>
                                        {product.status}
                                    </span>
                                </td>

                                {/* BOTONES FUNCIONALES */}
                                <td className="px-6 py-4 text-right flex justify-end gap-3">
                                    <button onClick={() => onEdit(product)} className="opacity-40 hover:opacity-100 hover:brightness-0 transition-all" title="Editar">
                                        <img src="/icons/edit.svg" alt="Editar" className="w-5 h-5" />
                                    </button>
                                    <button onClick={() => onDelete(product.id)} className="opacity-40 hover:opacity-100 hover:brightness-0 transition-all" title="Eliminar">
                                        <img src="/icons/trash.svg" alt="Eliminar" className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
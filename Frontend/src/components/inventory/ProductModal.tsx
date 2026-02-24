// src/components/inventory/ProductModal.tsx
import { useState, useEffect, useRef } from 'react';
import { Product } from '../../types/product';

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (product: Product) => void;
    productToEdit?: Product | null; // <--- NUEVO: Puede recibir un producto
}

export function ProductModal({ isOpen, onClose, onSave, productToEdit }: ProductModalProps) {
    const [afectoIGV, setAfectoIGV] = useState(true);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        nombre: '', codigo: '', costo: '', precioVenta: '', stock: '',
        categoria: 'Abarrotes', unidadMedida: 'Unidad (Und)', stockMinimo: '5', vencimiento: ''
    });

    // EFECTO DE APERTURA: Si hay producto a editar, llenamos los campos
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            if (productToEdit) {
                // Modo Edición: Llenar formulario
                setFormData({
                    nombre: productToEdit.nombre,
                    codigo: productToEdit.codigo,
                    costo: productToEdit.costo.toString(),
                    precioVenta: productToEdit.precioVenta.toString(),
                    stock: productToEdit.stock.toString(),
                    categoria: productToEdit.categoria,
                    unidadMedida: productToEdit.unidadMedida,
                    stockMinimo: '5', // Valor por defecto
                    vencimiento: productToEdit.vencimiento || ''
                });
                setImagePreview(productToEdit.imagen || null);
            } else {
                // Modo Creación: Limpiar formulario
                setFormData({ nombre: '', codigo: '', costo: '', precioVenta: '', stock: '', categoria: 'Abarrotes', unidadMedida: 'Unidad (Und)', stockMinimo: '5', vencimiento: '' });
                setImagePreview(null);
            }
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen, productToEdit]);

    if (!isOpen) return null;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl);
        }
    };

    const handleSubmit = () => {
        const productData: Product = {
            id: productToEdit ? productToEdit.id : Date.now(), // Si editamos, conservamos el ID. Si es nuevo, generamos uno.
            nombre: formData.nombre || 'Producto Nuevo',
            codigo: formData.codigo || '000000',
            categoria: formData.categoria,
            costo: parseFloat(formData.costo) || 0,
            precioVenta: parseFloat(formData.precioVenta) || 0,
            stock: parseInt(formData.stock) || 0,
            proveedor: productToEdit ? productToEdit.proveedor : 'Por definir', // Conservamos el proveedor si existe
            status: parseInt(formData.stock) > parseInt(formData.stockMinimo) ? 'En Stock' : (parseInt(formData.stock) > 0 ? 'Bajo Stock' : 'Sin Stock'),
            unidadMedida: formData.unidadMedida,
            vencimiento: formData.vencimiento,
            imagen: imagePreview || undefined
        };

        onSave(productData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-fade-in-up max-h-[90vh] flex flex-col">
                <div className="px-8 py-6 border-b border-gray-100 bg-white flex justify-between items-center">
                    {/* El título cambia si estás editando */}
                    <h2 className="text-2xl font-bold text-gray-900">
                        {productToEdit ? 'Editar Producto' : 'Nuevo Producto'}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <div className="p-8 overflow-y-auto space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-2">Nombre del Producto</label>
                            <input type="text" value={formData.nombre} onChange={(e) => setFormData({...formData, nombre: e.target.value})} placeholder="Ej: Coca Cola 3L" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none transition" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-2">Categoría</label>
                            <select value={formData.categoria} onChange={(e) => setFormData({...formData, categoria: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none transition bg-white cursor-pointer">
                                <option>Abarrotes</option>
                                <option>Bebidas</option>
                                <option>Snacks</option>
                                <option>Limpieza</option>
                                <option>Lácteos</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">Código de Barras</label>
                        <input type="text" value={formData.codigo} onChange={(e) => setFormData({...formData, codigo: e.target.value})} placeholder="Escanea o escribe" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none transition" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-2">Precio Costo (S/)</label>
                            <input type="number" min="0" value={formData.costo} onChange={(e) => setFormData({...formData, costo: e.target.value})} onWheel={(e) => e.currentTarget.blur()} placeholder="0.00" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none transition" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-2">Precio Venta (S/)</label>
                            <input type="number" min="0" value={formData.precioVenta} onChange={(e) => setFormData({...formData, precioVenta: e.target.value})} onWheel={(e) => e.currentTarget.blur()} placeholder="0.00" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none transition" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-2">Stock Inicial</label>
                            <input type="number" min="0" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} onWheel={(e) => e.currentTarget.blur()} placeholder="0" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none transition" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-2">Unidad de Medida</label>
                            <select value={formData.unidadMedida} onChange={(e) => setFormData({...formData, unidadMedida: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none transition bg-white cursor-pointer">
                                <option>Unidad (Und)</option>
                                <option>Kilogramo (Kg)</option>
                                <option>Litro (Lt)</option>
                                <option>Caja</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <label className="text-sm font-semibold text-gray-600">Afecto a IGV</label>
                        <button onClick={() => setAfectoIGV(!afectoIGV)} className={`w-12 h-6 rounded-full p-1 transition-colors ${afectoIGV ? 'bg-black' : 'bg-gray-300'}`}>
                            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${afectoIGV ? 'translate-x-6' : 'translate-x-0'}`}></div>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-2">Stock Mínimo (Alerta)</label>
                            <input type="number" min="0" value={formData.stockMinimo} onChange={(e) => setFormData({...formData, stockMinimo: e.target.value})} onWheel={(e) => e.currentTarget.blur()} placeholder="5" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none transition" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-2">Vencimiento (Opcional)</label>
                            <input type="date" value={formData.vencimiento} onChange={(e) => setFormData({...formData, vencimiento: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none transition text-gray-600" />
                        </div>
                    </div>

                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-center hover:bg-gray-50 transition cursor-pointer overflow-hidden relative min-h-[160px]"
                    >
                        <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
                        {imagePreview ? (
                            <img src={imagePreview} alt="Vista previa" className="absolute inset-0 w-full h-full object-contain p-2" />
                        ) : (
                            <div className="py-8">
                                <div className="bg-gray-100 p-3 rounded-full mb-3 mx-auto w-fit">
                                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                </div>
                                <p className="text-sm font-medium text-gray-600">Subir Imagen del Producto</p>
                                <p className="text-xs text-gray-400 mt-1">PNG, JPG hasta 5MB</p>
                            </div>
                        )}
                    </div>

                    {imagePreview && (
                        <button onClick={() => setImagePreview(null)} className="text-xs text-red-500 font-bold hover:underline w-full text-right mt-1">
                            Quitar imagen
                        </button>
                    )}
                </div>

                <div className="p-6 bg-white border-t border-gray-100 flex justify-end gap-4">
                    <button onClick={onClose} className="px-6 py-3 rounded-xl font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition">Cancelar</button>
                    {/* El botón también cambia su texto si estás editando */}
                    <button onClick={handleSubmit} className="px-6 py-3 rounded-xl font-bold text-white bg-black hover:bg-gray-800 shadow-lg transition transform hover:-translate-y-0.5">
                        {productToEdit ? 'Actualizar Producto' : 'Guardar Producto'}
                    </button>
                </div>
            </div>
        </div>
    );
}
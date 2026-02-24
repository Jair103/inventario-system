// src/types/product.ts
export interface Product {
    id: number;
    codigo: string;
    nombre: string;
    categoria: string;
    stock: number;
    costo: number;
    precioVenta: number;
    proveedor: string;
    status: 'En Stock' | 'Bajo Stock' | 'Sin Stock';
    unidadMedida: string;
    vencimiento?: string;
    imagen?: string; // <--- NUEVO: URL de la imagen (opcional)
}
import { Link, useLocation } from 'react-router-dom';

// 1. DEFINIMOS LA INTERFAZ PARA RECIBIR LA FUNCIÓN
interface SidebarProps {
    onLogout: () => void;
}

// 2. RECIBIMOS LA FUNCIÓN COMO PROP (onLogout)
export function Sidebar({ onLogout }: SidebarProps) {
    const location = useLocation();

    // Función para verificar si la ruta coincide
    const isActive = (path: string) => location.pathname === path;

    // Clases comunes para código más limpio
    const getLinkClass = (path: string) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group ${
            isActive(path)
                ? 'bg-white text-black font-bold shadow-md' // Estilo ACTIVO
                : 'text-gray-300 hover:bg-gray-900'         // Estilo INACTIVO
        }`;

    const getIconClass = (path: string) =>
        `w-5 h-5 transition-all ${
            isActive(path)
                ? 'brightness-0'            // Vuelve el icono NEGRO si está activo
                : 'group-hover:opacity-80'  // Opacidad normal si está inactivo
        }`;

    return (
        <div className="h-screen w-64 bg-black text-white flex flex-col fixed left-0 top-0 z-50">

            {/* Perfil del Usuario */}
            <div className="p-6 border-b border-gray-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center border border-gray-500">
                    👤
                </div>
                <div>
                    <p className="text-sm font-bold text-white">Gerente</p>
                    <p className="text-xs text-gray-400">admin@grocery.co</p>
                </div>
            </div>

            {/* Menú de Navegación */}
            <nav className="flex-1 p-4 space-y-2">

                {/* 1. TABLERO */}
                <Link to="/" className={getLinkClass('/')}>
                    <img src="/icons/dashboard.svg" alt="Tablero" className={getIconClass('/')} />
                    <span>Tablero</span>
                </Link>

                {/* 2. VENTAS */}
                <Link to="/ventas" className={getLinkClass('/ventas')}>
                    <img src="/icons/ventas.svg" alt="Ventas" className={getIconClass('/ventas')} />
                    <span>Ventas</span>
                </Link>

                {/* 3. GANANCIA */}
                <Link to="/ganancia" className={getLinkClass('/ganancia')}>
                    <img src="/icons/ganancia.svg" alt="Ganancia" className={getIconClass('/ganancia')} />
                    <span>Ganancia</span>
                </Link>

                {/* 4. INVENTARIO */}
                <Link to="/inventario" className={getLinkClass('/inventario')}>
                    <img src="/icons/inventario.svg" alt="Inventario" className={getIconClass('/inventario')} />
                    <span>Inventario</span>
                </Link>

            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-800 space-y-2">

                {/* AHORA ES UN LINK HACIA /configuraciones */}
                <Link to="/configuraciones" className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-900 rounded-lg transition-colors">
                    <img src="/icons/settings.svg" alt="Config" className="w-5 h-5" />
                    Configuraciones
                </Link>

                {/* 3. BOTÓN DE CERRAR SESIÓN MODIFICADO */}
                <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-900 rounded-lg transition-colors text-left"
                >
                    <img src="/icons/logout.svg" alt="Salir" className="w-5 h-5" />
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
}
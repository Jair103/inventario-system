// src/pages/Login.tsx
interface LoginProps {
    onLoginSuccess: () => void;
}

export function Login({ onLoginSuccess }: LoginProps) {
    // Simulamos el envío del formulario
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLoginSuccess(); // Llama a la función que inicia el Splash Screen
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white max-w-md w-full rounded-3xl shadow-2xl p-10 animate-fade-in-up border border-gray-100">

                {/* Logo o Icono */}
                <div className="text-center mb-8">
                    <div className="bg-black w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-5 shadow-lg">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Bienvenido de nuevo</h1>
                    <p className="text-sm text-gray-500 mt-2">Ingresa tus credenciales para acceder al sistema</p>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Usuario o Correo</label>
                        <input
                            type="text"
                            required
                            placeholder="admin@grocery.co"
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none transition text-gray-800"
                        />
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-semibold text-gray-700">Contraseña</label>
                            <a href="#" className="text-xs font-bold text-gray-400 hover:text-black transition">¿Olvidaste tu contraseña?</a>
                        </div>
                        <input
                            type="password"
                            required
                            placeholder="••••••••"
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none transition text-gray-800"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-black text-white py-3.5 rounded-xl font-bold shadow-lg hover:bg-gray-800 transition transform hover:-translate-y-0.5 mt-2"
                    >
                        Iniciar Sesión
                    </button>
                </form>

            </div>
        </div>
    );
}
"use client";

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import PasswordInput from './PasswordInput';
const Login: React.FC = () => {
  const [correoDuenotienda, setCorreoDuenotienda] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL_ADMIN}/duenotienda/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: correoDuenotienda,
          password: password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        const { accessToken } = data;

        // Almacenar el token en una cookie
        Cookies.set('token', accessToken, {
          expires: 1, // Expira en 1 día
          secure: process.env.NODE_ENV === 'production', // Solo en conexiones seguras en producción
          sameSite: 'strict', // Previene CSRF
          path: '/', // Disponible en todas las rutas
        });

       
      localStorage.setItem('token', accessToken);

        router.push('/administra'); // Redirige a /administra
      } else {
        setError(data.message || 'Error al iniciar sesión');
      }
    } catch (err) {
      console.error('Error al conectar con el servidor:', err);
      setError('Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="w-1/2 h-screen hidden lg:block">
        <img
          src="https://res.cloudinary.com/dh9etf988/image/upload/v1719453786/creatiendaya/AdobeStock_187853777_zd4azj.webp"
          alt="Placeholder Image"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form className='w-full min-w-[350px]' onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="correoDuenotienda" className="block text-gray-600">
              Correo electrónico
            </label>
            <input
              type="email"
              id="correoDuenotienda"
              name="correoDuenotienda"
              className="w-full min-w-[350px] border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
              value={correoDuenotienda}
              onChange={(e) => setCorreoDuenotienda(e.target.value)}
              required
            />
          </div>
          <PasswordInput password={password} setPassword={setPassword} />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Login'}
          </button>
        </form>
        <div className="mt-6 text-blue-500 text-center">
          <a href="/registrar" className="hover:underline">
            Registrarse Aquí
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;

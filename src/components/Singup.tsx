'use client';
import React, { useState } from 'react';
import PasswordInput from './PasswordInput';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
const SignUpSection: React.FC = () => {
    const router = useRouter();
  const [nombre, setNombre] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [passwordDueno, setPasswordDueno] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_ADMIN}/duenotienda/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          email,
          password: passwordDueno,
        }),
      });

      if (response.ok) {
        const data = await response.json();
   

        try {
            const res = await fetch('http://localhost:3002/duenotienda/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email,
                password: passwordDueno,
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
      
              // Opcional: también puedes almacenarlo en localStorage si es necesario
              // localStorage.setItem('token', accessToken);
      
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
      } else {
        alert('Error en el registro');
        // Maneja errores
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
        <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h1 className="title-font font-medium text-3xl text-gray-900">
            Registra tu Tienda
          </h1>
          <p className="leading-relaxed mt-4">
            Crea tu cuenta para comenzar a administrar tu tienda en línea.
          </p>
        </div>
        <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="relative mb-4">
              <label htmlFor="nombre" className="leading-7 text-sm text-gray-600">Nombre</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                required
              />
            </div>
            <div className="relative mb-4">
              <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                required
              />
            </div>
            <PasswordInput password={passwordDueno} setPassword={setPasswordDueno} />
            <button type="submit" className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              Registrarme
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUpSection;

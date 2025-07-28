"use client"
import React from 'react';
import { useRouter } from 'next/navigation'; // Usa useRouter para la redirección

const Logout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Realiza la solicitud al backend para limpiar la cookie
      const res = await fetch('http://localhost:3002/auth/logout', {
        method: 'POST',
        credentials: 'include', // Asegúrate de incluir las cookies en la solicitud
      });

      if (res.ok) {
        // Redirige al usuario a la página de inicio de sesión después del logout
        router.push('/login');
      } else {
        console.error('Error al cerrar sesión');
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
    }
  };

  return (
    <a
      href="#"
      className="text-gray-500 transition-colors duration-200 rotate-180 dark:text-gray-400 rtl:rotate-0 hover:text-blue-500 dark:hover:text-blue-400"
      onClick={handleLogout}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
        />
      </svg>
    </a>
  );
};

export default Logout;

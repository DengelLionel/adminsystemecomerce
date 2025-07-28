"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

const ItemMenu = ({ Titulo, Icono, ruta = "/administra" }: any) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(ruta); // Navegar a la ruta especificada
    window.location.href = ruta; // Forzar la recarga completa de la página
  };

  return (
    <div
      className="cursor-pointer flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 select-none"
      onClick={handleClick}
    >
      {Icono}
      <span className="mx-2 text-sm font-medium">{Titulo}</span>
    </div>
  );
};

export default ItemMenu;

"use client"
import React, { useState } from 'react';
import Logout from './Logout';
import ItemMenu from './ItemMenu';
import Home from './iconos/Home';
import Producto from './iconos/Producto';
import Pedido from './iconos/Pedido';
import Clientes from './iconos/Clientes';
import Proveedor from './iconos/Proveedor';
import SubItemMenu from './SubItemMenu';
import Categoria from './iconos/Categoria';
import Resenas from './iconos/Resenas';
import UsuarioImagen from './UsuarioImagen';
import { useEffect } from 'react';
interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Limpieza si el componente se desmonta
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  return (
    <>
      {/* Botón de abrir menú solo visible en mobile */}
      <button
         className="fixed top-4 left-4 z-[50] p-2 bg-blue-600 text-white rounded-md md:hidden"
         onClick={() => setIsOpen(true)}
      >
        ☰
      </button>

      {/* Fondo oscuro al abrir sidebar */}
      {isOpen && (
        <div
          className="fixed h-screen inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <aside className={`
       fixed md:sticky top-0 h-screen overflow-auto md:w-[250px] md:min-w-[200px] w-64 min-w-[250px] px-5 py-8 bg-white border-r dark:bg-gray-900 dark:border-gray-700 
        transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out
        md:translate-x-0  md:block z-50
      `}>
        <a href="#">
          <img className="w-auto h-7" src="https://merakiui.com/images/logo.svg" alt="Logo" />
        </a>

        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav className="flex-1 -mx-3 space-y-3">
            {/* Resto de tu código igual */}
            <div className="relative mx-3">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                  <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round" />
                </svg>
              </span>
              <input
                type="text"
                className="w-full py-1.5 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                placeholder="Search"
              />
            </div>

            <ItemMenu Titulo="Home" Icono={<Home />} ruta="/administra/" />
            <ItemMenu Titulo="Productos" Icono={<Producto />} ruta="/administra/productos" />
            <div className="pl-[20px]">
              <SubItemMenu Titulo="Categoría" Icono={<Categoria />} ruta="/administra/productos/categorias" />
              <SubItemMenu Titulo="Reseñas" Icono={<Resenas />} ruta="/administra/productos/resenas" />
            </div>
            <ItemMenu Titulo="Pedidos" Icono={<Pedido />} ruta="/administra/pedidos" />
            <ItemMenu Titulo="Clientes" Icono={<Clientes />} ruta="/administra/clientes" />
            <ItemMenu Titulo="Proveedores" Icono={<Proveedor />} ruta="/administra/proveedores" />
          </nav>

          <div className="mt-6">
            <div className="p-3 bg-gray-100 rounded-lg dark:bg-gray-800">
              <h2 className="text-sm font-medium text-gray-800 dark:text-white">
                New feature available!
              </h2>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus harum officia eligendi velit.
              </p>
              <img
                className="object-cover w-full h-32 mt-2 rounded-lg"
                src="https://images.unsplash.com/photo-1658953229664-e8d5ebd039ba"
                alt="Feature"
              />
            </div>

            <div className="flex items-center justify-between mt-6">
              <UsuarioImagen />
              <Logout />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

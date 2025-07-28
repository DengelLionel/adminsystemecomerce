"use client";
import { useState, useEffect } from 'react';
import { useGlobalContext } from "@/context/GlobalContext";

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { productState, setProductState } = useGlobalContext();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      setIsOpen(false);
    }
  };

  const handleStateChange = (state: string) => {
    // Cambiar a booleano: "Activo" -> true, "Borrador" -> false
    const isActive = state === "Activo";
    setProductState(isActive); // Cambiar a true o false
    setIsOpen(false); // Cerrar el menú después de seleccionar una opción
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block dropdown">
      <button
        onClick={toggleDropdown}
        className="relative z-10 flex items-center p-2 text-sm text-gray-600 bg-white border border-transparent rounded-md focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring  focus:outline-none"
      >
        <span className="mx-1">{productState ? "Activo" : "Borrador"}</span>
        <svg
          className="w-5 h-5 mx-1"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z"
            fill="currentColor"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 z-20 w-56 py-2 mt-2 overflow-hidden origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800 transition transform"
        >
          <hr className="border-gray-200 dark:border-gray-700 " />
          <button
            onClick={() => handleStateChange("Activo")}
            className="w-full text-left flex items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="mx-1">Activo</span>
          </button>

          <button
            onClick={() => handleStateChange("Borrador")}
            className="w-full text-left flex items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="mx-1">Borrador</span>
          </button>
        </div>
      )}
    </div>
  );
}

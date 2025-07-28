"use client"; // Asegura que este componente se ejecute en el entorno del cliente
import React from "react";
import { useRouter } from 'next/navigation'; // Importar useRouter para manejar navegación

interface Product {
  id: number;
  name: string;
  estado: boolean;
  inventario: number;
  categoria: string;
  tipo: string;
  proveedor: string;
}

interface ProductListTableProps {
  products: Product[];
}

const ProductListTable: React.FC<ProductListTableProps> = ({ products }) => {
  const router = useRouter(); // Inicializar useRouter

  // Función para manejar la navegación al hacer clic en un producto
  const handleProductClick = (id: number) => {
    router.push(`/administra/productos/editar/${String(id)}`);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 border-b border-gray-200 text-left text-sm leading-4 text-gray-600 tracking-wider">
              Producto
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-sm leading-4 text-gray-600 tracking-wider">
              Estado
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-sm leading-4 text-gray-600 tracking-wider">
              Inventario
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-sm leading-4 text-gray-600 tracking-wider">
              Categoría
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-sm leading-4 text-gray-600 tracking-wider">
              Tipo
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-sm leading-4 text-gray-600 tracking-wider">
              Proveedor
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="hover:bg-gray-50 cursor-pointer" // Añadir cursor-pointer para resaltar clickeable
              onClick={() => handleProductClick(product.id)} // Redirigir al hacer clic
            >
              <td className="px-6 py-4 border-b border-gray-200 text-sm">
                {product.name}
              </td>
              <td className="px-6 py-4 border-b border-gray-200 text-sm">
                <span
                  className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    product.estado === true
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {product.estado === true ? "ACTIVO" : "BORRADOR"}
                </span>
              </td>
              <td className="px-6 py-4 border-b border-gray-200 text-sm">
                {product.inventario}
              </td>
              <td className="px-6 py-4 border-b border-gray-200 text-sm">
                {product.categoria}
              </td>
              <td className="px-6 py-4 border-b border-gray-200 text-sm">
                {product.tipo}
              </td>
              <td className="px-6 py-4 border-b border-gray-200 text-sm">
                {product.proveedor}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductListTable;

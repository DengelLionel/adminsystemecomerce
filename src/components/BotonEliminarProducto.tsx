import React from 'react';

interface BotonEliminarProductoProps {
  id: number;
}

const BotonEliminarProducto: React.FC<BotonEliminarProductoProps> = ({ id}) => {
  const eliminarProducto = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_ADMIN}/productos/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        console.log(`Producto con ID ${id} eliminado exitosamente.`);
        window.location.href = '/administra/productos/';
      } else {
        console.error('Error al eliminar el producto.');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  return (
    <button
      onClick={eliminarProducto}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
    >
      Eliminar Producto
    </button>
  );
};

export default BotonEliminarProducto;

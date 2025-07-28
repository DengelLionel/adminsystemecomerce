"use client"
import Link from "next/link";
import ProductListTable from "@/components/ProductListTable";
import { useState,useEffect } from "react";
interface Product {
  id: number;
  name: string;
  estado: boolean;
  inventario: number;
  categoria: string;
  tipo: string;
  proveedor: string;
}
export default function ProductosPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener productos desde el backend
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_ADMIN}/productos`);
      if (!response.ok) {
        throw new Error("Error al obtener productos");
      }
      const data = await response.json();

      // Mapea los datos a la estructura que espera el componente ProductListTable
      const mappedProducts = data.map((product: any) => ({
        id: product.id,
        name: product.nombre,
        estado: product.estado,
        inventario: product.stock,
        categoria: product.categoria ? product.categoria.nombre : "Sin categoría",
        tipo: product.tipoProducto || "Desconocido",
        proveedor: product.proveedor ? product.proveedor.nombre : "Sin proveedor",
      }));

      setProducts(mappedProducts);
      setLoading(false);
    } catch (error) {
      setError("Hubo un problema al cargar los productos");
      setLoading(false);
    }
  };

  // Llamar a fetchProducts cuando el componente se monte
  useEffect(() => {
    fetchProducts();
  }, []);

  // Renderizar mientras se cargan los productos
  if (loading) {
    return <div>Cargando productos...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div>
      <div className="flex flex-col md:flex-row items-center md:space-x-96 w-full">
      <h1>Productos</h1>
      <Link href="/administra/productos/crearproducto" className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
   CREAR PRODUCTO
</Link>
      </div>
      

      <p>Este es el contenido de la página de productos.</p>
      <ProductListTable products={products} />
    </div>
  );
}

"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useGlobalContext } from '../context/GlobalContext';

const BotonActualizar: React.FC<{ id: string }> = ({ id }) => {
  const router = useRouter();
    const {
      productName,
      regularPrice,
      comparePrice,
      inventory,
      sku,
      codigobarras,
      editorContent,
      proveedor,
      categoria,
      title,
      metaDescription,
      productState,
      etiquetas,
      mediaFiles,
      setProductName,
      setRegularPrice,
      setComparePrice,
      setInventory,
      setSku,
      slug,
      setCodigobarras,
      setSlug,
      setEditorContent,
      setProveedor,
      setCategoria,
      setTitle,
      setMetaDescription,
      setProductState,
      setEtiquetas,
      setMediaFiles,
      variantsfinal
    } = useGlobalContext();
    const formattedVariants = Array.isArray(variantsfinal)
    ? variantsfinal.map(variant => ({
        ...variant,
        id: Number(variant.id),
        precio: Number(variant.precio)
      }))
    : [];
  
    const handleUpdate = async () => {
      const parsedRegularPrice = parseFloat(regularPrice);
      const parsedComparePrice = comparePrice ? parseFloat(comparePrice) : undefined;
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_ADMIN}/productos/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nombre: productName.trim(),
            descripcion: editorContent,
            precio: parsedRegularPrice,
            precioComparacion: parsedComparePrice,
            stock: inventory,
            sku:sku.trim(),
            slug: slug,
            codigoBarra: codigobarras.trim(),
            metaTitulo: title,
            metaDescripcion: metaDescription.trim(),
            estado: productState,
/*             proveedorId: proveedor,
            categoriaId: categoria, */
            etiquetas: etiquetas.map((tag) => tag.nombre),
            archivos: mediaFiles,
            variantes: formattedVariants
          }),
        });
  
        if (response.ok) {
          router.push('/administra/productos/');
          window.location.href = '/administra/productos/';
          setProductName('');
          setRegularPrice("0");
          setComparePrice("0");
          setInventory(0);
          setSku('');
          setSlug('');
          setCodigobarras('');
          setSlug('');
          setEditorContent('');
          setProveedor('');
          setCategoria('');
          setTitle('');
          setMetaDescription('');
          setProductState(false);
          setEtiquetas([]);
          setMediaFiles([]);

        } else {
          console.error('Error al actualizar el producto:', await response.json());
          alert('Error al actualizar el producto');
        }
      } catch (error) {
        console.error('Error al actualizar el producto:', error);
        alert('Hubo un problema al actualizar el producto');
      }
    };
  
    return (
      <button onClick={handleUpdate} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
        Actualizar Producto
      </button>
    );
  };
  export default BotonActualizar
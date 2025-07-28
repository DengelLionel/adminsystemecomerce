"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGlobalContext } from '../context/GlobalContext';

interface FloatingSaveButtonProps {
  variants: any[];
}

const FloatingSaveButton: React.FC<FloatingSaveButtonProps> = ({ variants }) => {
  const router = useRouter();
  const {
    productName,
    setProductName,
    regularPrice,
    setRegularPrice,
    comparePrice,
    setComparePrice,
    inventory,
    setInventory,
    sku,
    setSku,
    codigobarras,
    setCodigobarras,
    slug,
    setSlug,
    editorContent,
    setEditorContent,
    proveedor,
    setProveedor,
    categoria,
    setCategoria,
    title,
    setTitle,
    metaDescription,
    setMetaDescription,
    productState,
    setProductState,
    etiquetas,
    setEtiquetas,
    mediaFiles,
    setMediaFiles,

  } = useGlobalContext();





  const handleSave = async () => {
    const parsedRegularPrice = parseFloat(regularPrice);
    const parsedComparePrice = comparePrice ? parseFloat(comparePrice) : undefined;


    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_ADMIN}/productos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: productName.trim(),
          descripcion: editorContent,
          precio: parsedRegularPrice,
          precioComparacion: parsedComparePrice,
          stock: inventory,
          sku: sku.trim(),
          codigoBarra: codigobarras.trim(),
          slug: slug,
          metaTitulo: title,
          metaDescripcion: metaDescription.trim(),
          estado: productState,
          etiquetas: etiquetas.map((tag) => tag.nombre),
          archivos: mediaFiles,
          variantes: variants,
        }),
      });

      if (response.ok) {
        console.log("Producto enviado exitosamente");
        router.push('/administra/productos/');
        window.location.href = '/administra/productos/';
        // Restablecer los estados de formulario
        setProductName('');
        setRegularPrice("0");
        setComparePrice("0");
        setInventory(0);
        setSku('');
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
        console.error('Error al guardar el producto:', await response.json());
        alert('Error al guardar el producto');
      }
    } catch (error) {
      console.error('Error al guardar el producto:', error);
      alert('Hubo un problema al guardar el producto');
    }
  };

  return (
    <div className="fixed top-0 w-[300px]  right-0 bg-white shadow-md border-b border-gray-300 z-50 p-4 flex justify-center">
      <div className="flex items-center gap-4">
        <button 
          onClick={handleSave} 
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Guardar
        </button>
      </div>
    </div>
  );
};

export default FloatingSaveButton;

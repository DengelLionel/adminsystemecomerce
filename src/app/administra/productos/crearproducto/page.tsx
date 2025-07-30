"use client"
import dynamic from 'next/dynamic';
import ContenidoAdminDerecha from '@/components/ContenidoAdminDerecha';
import ContenidoAdminIzquierda from '@/components/ContenidoAdminIzquierda';
import Dropdown from '@/components/Dropdown';
import MediaUploader from '@/components/MediaUploader';
import React from 'react';
import ProductSEO from '@/components/ProductSEO';
import TextInput from "@/components/Textinput";
import PriceInput from '@/components/PriceInput';
import SimpleInventoryInput from '@/components/SingleInventarioInput';
import { useGlobalContext } from "@/context/GlobalContext";
import { useState } from 'react';
import TagInput from '@/components/TagInput';
import FloatingSaveButton from '@/components/FloatingSaveButton';

// Carga dinámica para componentes que pueden causar problemas de hidratación
const VariantListTable = dynamic(() => import('@/components/ProductVariantManager'), { ssr: false });
const RichTextEditor = dynamic(() => import('@/components/RichTextEditor'), { ssr: false });
const DropdownDynamic = dynamic(() => import('@/components/Dropdown'), { ssr: false });

const page = () => {
  const {
    productName,
    setProductName,
    tipoProducto,
    setTipoProducto,
    proveedor,
    setProveedor,
    coleccion,
    setColeccion,
    etiquetas,
    setEtiquetas,
    categoria,
    setCategoria,
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
    handleInputChange,
  } = useGlobalContext();
 

 const [variants, setVariants] = useState([]);
  const [options, setOptions] = useState([]);
const [mediaFiles, setMediaFiles] = useState<{ url: string; tipo: string }[]>([]);

 
  return (
    <div className="bg-[#f3f4f6] relative">
   <FloatingSaveButton variants={variants} mediaFiles={mediaFiles} setMediaFiles={setMediaFiles}/>
      <div className="p-[15px] mt-20">Agregar producto</div> {/* Ajustar espacio para que no cubra el título */}
      <div className="flex flex-col md:flex-row gap-[15px] justify-center">
        {/* LADO IZQUIERDO */}
        <div className="flex flex-col gap-[15px]">
          <ContenidoAdminIzquierda>
            <TextInput
              id="product-name"
              name="product-name"
              label="Nombre"
              placeholder="Pantalon azul"
              value={productName}
              onChange={handleInputChange(setProductName)}
            />
          </ContenidoAdminIzquierda>
          <ContenidoAdminIzquierda>
            <div>
              <label
                htmlFor="descripcion"
                className="block text-sm text-gray-500 mb-[10px]"
              >
                Descripción
              </label>

              <RichTextEditor/>
            </div>
          </ContenidoAdminIzquierda>
          <ContenidoAdminIzquierda>
            <MediaUploader mediaFiles={mediaFiles} setMediaFiles={setMediaFiles} />
          </ContenidoAdminIzquierda>
          <ContenidoAdminIzquierda>
            <TextInput
              id="categoria"
              name="categoria"
              label="Categoria"
              placeholder=""
              value={categoria}
              onChange={handleInputChange(setCategoria)}
            />
          </ContenidoAdminIzquierda>
          <ContenidoAdminIzquierda>
            <div className="flex flex-row gap-[20px]">
              <PriceInput
                id="regular-price"
                label="Precio Normal"
                placeholder="0.00"
                value={regularPrice}
                onChange={handleInputChange(setRegularPrice)}
              />
              <PriceInput
                id="compare-price"
                label="Precio de Comparación"
                placeholder="0.00"
                value={comparePrice}
                onChange={handleInputChange(setComparePrice)}
              />
            </div>
          </ContenidoAdminIzquierda>

          <ContenidoAdminIzquierda>
            <div className="flex flex-wrap gap-[20px]">
              <SimpleInventoryInput
                value={inventory}
                onChange={(e) => setInventory(parseInt(e.target.value, 10))}
              />
              <TextInput
                id="sku"
                name="sku"
                label="SKU (código de artículo)"
                placeholder=""
                value={sku}
                onChange={handleInputChange(setSku)}
              />
              <TextInput
                id="codigobarras"
                name="codigobarras"
                label="Código de barras (ISBN, UPC, GTIN, etc.)"
                placeholder=""
                value={codigobarras}
                onChange={handleInputChange(setCodigobarras)}
              />
            </div>
          </ContenidoAdminIzquierda>

          
          <ContenidoAdminIzquierda>
       <VariantListTable
              variants={variants}
              setVariants={setVariants}
              options={options}
              setOptions={setOptions}
            />
          </ContenidoAdminIzquierda>

          <ContenidoAdminIzquierda>
          <ProductSEO/>
          </ContenidoAdminIzquierda>
        </div>

        {/* LADO DERECHO */}
        <div className="flex flex-col gap-[15px]">
          <ContenidoAdminDerecha>
            <DropdownDynamic />
          </ContenidoAdminDerecha>
          <ContenidoAdminDerecha>
            <TextInput
              id="tipo-de-producto"
              name="tipo-de-producto"
              label="Tipo de producto"
              placeholder=""
              value={tipoProducto}
              onChange={handleInputChange(setTipoProducto)}
            />
            <TextInput
              id="proveedor"
              name="proveedor"
              label="Proveedor"
              placeholder=""
              value={proveedor}
              onChange={handleInputChange(setProveedor)}
            />
            <TextInput
              id="coleccion"
              name="coleccion"
              label="Colecciones"
              placeholder=""
              value={coleccion}
              onChange={handleInputChange(setColeccion)}
            />
            <TagInput/>
          </ContenidoAdminDerecha>
        </div>
      </div>
    </div>
  );
}

export default page;

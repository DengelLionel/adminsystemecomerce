"use client"
import dynamic from 'next/dynamic';
import ContenidoAdminDerecha from '@/components/ContenidoAdminDerecha';
import ContenidoAdminIzquierda from '@/components/ContenidoAdminIzquierda';
import MediaUploader from '@/components/MediaUploader';
import React, { useEffect,useState } from 'react';
import ProductSEO from '@/components/ProductSEO';
import TextInput from "@/components/Textinput";
import PriceInput from '@/components/PriceInput';
import SimpleInventoryInput from '@/components/SingleInventarioInput';
import { useGlobalContext } from "@/context/GlobalContext";
import TagInput from '@/components/TagInput';
import BotonActualizar from '@/components/BotonActualizar';
import { useRouter } from 'next/navigation'; // Asegúrate de usar esto para redirecciones
import BotonEliminarProducto from '@/components/BotonEliminarProducto';

const Variantes = dynamic(() => import('@/components/ProductVariantManager'), { ssr: false });
const MassEditTable = dynamic(() => import('@/components/MassEditTable'), { ssr: false });

const RichTextEditorUpdate = dynamic(() => import('@/components/RichTextEditorUpdate'), { ssr: false });
const DropdownDynamic = dynamic(() => import('@/components/Dropdown'), { ssr: false });

const EditarProducto = ({ params }: { params: { id: string } }) => {
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
      mediaFiles,
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
      setSlug,
      codigobarras,
      setEditorContent,
      setProductState,
      setCodigobarras,
      handleInputChange,
      setVariantsfinal,
      setMediaFiles,
      setMetaDescription,
      setTitle,
      variantsfinal,optionsfinal, setOptionsfinal
    } = useGlobalContext();
    const [massEditMode, setMassEditMode] = useState(false);
    const [selectedVariants, setSelectedVariants] = useState<number[]>([]);
    
    const id = params.id; // Obtener el ID del producto de las props
  
    const cargarDatosProducto = async () => {
      if (!id) return;
      if (id){
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_URL_ADMIN}/productos/${id}`);
          if (response.ok) {
            const data = await response.json();
            console.log("data update",data)
            // Aquí debes actualizar el estado del contexto con los datos del producto cargado
            setProductName(data.nombre);
            setTipoProducto(data.tipoProducto);
            setProveedor(data.proveedor);
            setColeccion(data.coleccion);
            setEtiquetas(data.etiquetas);
            setCategoria(data.categoria);
            setProductState(data.estado);
            setRegularPrice(data.precio);
            setEditorContent(data.descripcion);
            setComparePrice(data.precioComparacion);
            setInventory(data.stock);
            setSku(data.sku);
            setSlug(data.slug);
            setMetaDescription(data.metaDescripcion);
            setTitle(data.metaTitulo);
            setMediaFiles(data.archivos.map((file: { id: number; url: string; tipo: string }) => ({
              file: null,
              url: file.url,
              type: file.tipo === "imagen" ? "image" : "video", // Asegurar que se interprete correctamente el tipo
            })));
            console.log("datos media: ", mediaFiles)
            setCodigobarras(data.codigoBarra);
           // Manejo de variantes y atributos
           const formattedVariants = data.variantes.map((variante: any) => ({
            id: variante.id,
            nombre: variante.nombre,
            precio: Number(variante.precio) || 0,
            stock: Number(variante.stock) || 0,
            sku: variante.sku || '',
            imagenUrl: variante.imagenUrl || '',
            atributos: variante.atributos.map((atributo: any) => ({
              id: atributo.id,
              valor: atributo.valor,
              atributonombre: atributo.atributo?.nombre || '',
            })),
          }));
    
          // Convertir los atributos para VariantOptionManager
          const optionsMap: { [key: string]: Set<string> } = {};
          formattedVariants.forEach((variant:any) => {
            variant.atributos.forEach((attr:any) => {
              if (!optionsMap[attr.atributonombre]) {
                optionsMap[attr.atributonombre] = new Set();
              }
              optionsMap[attr.atributonombre].add(attr.valor);
            });
          });
    
          // Preparar opciones para `VariantOptionManager`
          const initialOptions = Object.keys(optionsMap).map((optionName) => ({
            name: optionName,
            values: Array.from(optionsMap[optionName]),
          }));
  
          setVariantsfinal(formattedVariants); // Cargar variantes en el contexto o estado de variantes
          setOptionsfinal(initialOptions);
         console.log("variantessss, ",formattedVariants)
          } else {
            console.error("Error al cargar los datos del producto.");
          }
        } catch (error) {
          console.error("Error de red:", error);
        }
      }else{
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
  
      }
    
    };
  
    useEffect(() => {
      cargarDatosProducto();
    }, [id]);
  
    return (
      <div className="bg-[#f3f4f6] relative">
        <BotonActualizar id={id} /> {/* Pasar el ID del producto al botón de actualizar */}
        <div className="p-[15px] mt-20">Actualizar producto</div> {/* Ajustar espacio para que no cubra el título */}
        <div className="flex flex-row gap-[15px] justify-center">
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
                <RichTextEditorUpdate />
              </div>
            </ContenidoAdminIzquierda>
            <ContenidoAdminIzquierda>
              <MediaUploader />
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
            <Variantes
  variants={variantsfinal}
  setVariants={setVariantsfinal}
  options={optionsfinal}
  setOptions={setOptionsfinal}
/>

              {massEditMode && (
  <MassEditTable
    variants={variantsfinal}
    setVariants={setVariantsfinal}
    selectedVariants={selectedVariants}
    setMassEditMode={setMassEditMode}
  />
)}

            </ContenidoAdminIzquierda>
            
  
            <ContenidoAdminIzquierda>
              <ProductSEO />
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
              <TagInput />
            </ContenidoAdminDerecha>
            <BotonEliminarProducto id={Number(id)}/>
          </div>
        </div>
      </div>
    );
  }
  
  export default EditarProducto;
  
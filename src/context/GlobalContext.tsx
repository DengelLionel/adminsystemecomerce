"use client";
import React, { createContext, useContext, useState, ReactNode, ChangeEvent } from "react";

import { addTagToList, removeTagFromList } from "../utils/tagUtils";

interface Media {
  file: File | null; // Cambia a `null` cuando proviene del backend
  url: string;
  type: "image" | "video"; // Cambiar `tipo` a `type`
}
interface Etiqueta {
  id: number;
  nombre: string;
}
interface GlobalContextType {
  // Datos del producto
  productName: string;
  setProductName: (name: string) => void;
  tipoProducto: string;
  setTipoProducto: (tipo: string) => void;
  proveedor: string;
  setProveedor: (proveedor: string) => void;
  coleccion: string;
  setColeccion: (coleccion: string) => void;
  etiquetas: Etiqueta[];
  setEtiquetas: (tags: Etiqueta[]) => void;

  productState: boolean; // Cambiar a booleano
  setProductState: (productState: boolean) => void; // Cambiar a aceptar booleano
  categoria: string;
  setCategoria: (categoria: string) => void;
  regularPrice: string;
  setRegularPrice: (price: string) => void;
  comparePrice: string;
  setComparePrice: (price: string) => void;
  inventory: number;
  setInventory: (inventory: number) => void;
  sku: string;
  setSku: (sku: string) => void;
  codigobarras: string;
  setCodigobarras: (codigo: string) => void;
  handleInputChange: (setter: (value: any) => void) => (e: ChangeEvent<HTMLInputElement>) => void;
  // Propiedades SEO
  title: string;
  setTitle: (title: string) => void;
  metaDescription: string;
  setMetaDescription: (description: string) => void;
  slug: string;
  setSlug: (slug: string) => void;
  noIndex: boolean;
  setNoIndex: (noIndex: boolean) => void;
  canonicalUrl: string;
  setCanonicalUrl: (url: string) => void;
  URL_DE_LA_TIENDA: string;
  editorContent: string;
  setEditorContent: (content: string) => void;

  // Propiedades para las etiquetas
  addTag: (tag: Etiqueta) => void;
  removeTag: (tag: Etiqueta) => void;
  // Archivos multimedia
  mediaFiles: Media[];
  setMediaFiles: React.Dispatch<React.SetStateAction<Media[]>>;
  addMedia: (files: FileList | { id: number; url: string; tipo: string }[]) => void;
  removeMedia: (index: number) => void;
  variantsfinal:any[];
   setVariantsfinal: (variantsfinal: any[]) => void;
   optionsfinal:any[];
    setOptionsfinal: (optionsfinal: any[]) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [productName, setProductName] = useState("");
  const [tipoProducto, setTipoProducto] = useState("");
  const [proveedor, setProveedor] = useState("");
  const [coleccion, setColeccion] = useState('');
  const [etiquetas, setEtiquetas] = useState<Etiqueta[]>([]);
  const [categoria, setCategoria] = useState('');
  const [productState, setProductState] = useState<boolean>(false); // Iniciar como booleano (false para "Borrador")
  const [regularPrice, setRegularPrice] = useState("0");
  const [comparePrice, setComparePrice] = useState("0");
  const [inventory, setInventory] = useState(0);
  const [sku, setSku] = useState("");
  const [codigobarras, setCodigobarras] = useState("");

  const [title, setTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [noIndex, setNoIndex] = useState(false);
  const URL_DE_LA_TIENDA = "https://mitiendaden.com/producto";
  const [canonicalUrl, setCanonicalUrl] = useState(`${URL_DE_LA_TIENDA}/${slug}`);
  const [editorContent, setEditorContent] = useState('');

  const addTag = (tag: Etiqueta) => {
    setEtiquetas(prevTags => [...prevTags, tag]);
  };
  
  const removeTag = (tagToRemove: Etiqueta) => {
    setEtiquetas(prevTags => prevTags.filter(tag => tag.id !== tagToRemove.id));
  };

  const handleInputChange = (setter: (value: any) => void) => (e: ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
  };

  const addMedia = (files: FileList | { id: number; url: string; tipo: string }[]) => {
    let updatedMedia: Media[] = [];
  
    if (files instanceof FileList) {
      // Archivos seleccionados localmente
      updatedMedia = Array.from(files).map((file:any) => {
      
        const fileType = file.type.startsWith("image") ? "image" : "video"; // Verifica si es imagen o video
        return {
          file,
          url: URL.createObjectURL(file),
          type: fileType,
        };
      });
    } else {
      // Archivos provenientes del backend
      updatedMedia = files.map((file) => ({
        file: null, // No hay archivo físico si viene del backend
        url: file.url,
        type: file.tipo === "imagen" ? "image" : "video", // Asegúrate de que 'tipo' se lea correctamente
      }));
    }
  
   
  };
  


  React.useEffect(() => {
    setCanonicalUrl(`${URL_DE_LA_TIENDA}/${slug}`);
  }, [slug, URL_DE_LA_TIENDA]);

  return (
    <GlobalContext.Provider
      value={{
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
        productState,
        setProductState,
        title,
        setTitle,
        metaDescription,
        setMetaDescription,
        slug,
        setSlug,
        noIndex,
        setNoIndex,
        canonicalUrl,
        setCanonicalUrl,
        URL_DE_LA_TIENDA,
        addTag,
        removeTag,
        editorContent,
        setEditorContent,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook para usar el contexto global
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext debe usarse dentro de GlobalProvider");
  }
  return context;
};

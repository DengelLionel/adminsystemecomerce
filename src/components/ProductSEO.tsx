import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";

const ProductSEO: React.FC = () => {
  const { 
    title, setTitle, 
    metaDescription, setMetaDescription, 
    slug, setSlug, 
    noIndex, setNoIndex, 
    canonicalUrl, setCanonicalUrl,
    URL_DE_LA_TIENDA,
    productName
  } = useGlobalContext();

  const [isTitleManuallyEdited, setIsTitleManuallyEdited] = useState(false);

  // Sincroniza el título del SEO con el nombre del producto, solo si no ha sido modificado manualmente
  useEffect(() => {
    if (!isTitleManuallyEdited && productName) {
      setTitle(productName);
    }
  }, [productName, isTitleManuallyEdited, setTitle]);

  // Generar y actualizar el slug basado en el título
  useEffect(() => {
    const generatedSlug = title ? title.trim().toLowerCase().replace(/\s+/g, "-") : "";
    setSlug(generatedSlug);
    setCanonicalUrl(`${URL_DE_LA_TIENDA}/${generatedSlug}`);
  }, [title, URL_DE_LA_TIENDA, setSlug, setCanonicalUrl]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setIsTitleManuallyEdited(true); // Marcar como modificado manualmente
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Configuraciones SEO del Producto</h2>
      
      <div className="mb-4">
        <label htmlFor="seo-title" className="block text-sm font-medium text-gray-700">
          Título del Producto (SEO)
        </label>
        <input
          type="text"
          id="seo-title"
          value={title}
          onChange={handleTitleChange}
          placeholder="Título optimizado para SEO"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="seo-meta-description" className="block text-sm font-medium text-gray-700">
          Descripción Meta
        </label>
        <textarea
          id="seo-meta-description"
          value={metaDescription}
          onChange={(e) => setMetaDescription(e.target.value)}
          placeholder="Breve descripción del producto para SEO"
          rows={3}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="seo-slug" className="block text-sm font-medium text-gray-700">
          URL Amigable (Slug)
        </label>
        <div className="flex">
          <span className="bg-gray-100 px-3 py-2 rounded-l-md border border-gray-300 text-gray-700">
            {URL_DE_LA_TIENDA}/
          </span>
          <input
            type="text"
            id="seo-slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
            placeholder="ejemplo-de-producto"
            className="mt-1 block w-full rounded-r-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
      </div>

      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          id="no-index"
          checked={noIndex}
          onChange={(e) => setNoIndex(e.target.checked)}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="no-index" className="ml-2 block text-sm text-gray-700">
          No Index (Evitar que los motores de búsqueda indexen esta página)
        </label>
      </div>
    </div>
  );
};

export default ProductSEO;

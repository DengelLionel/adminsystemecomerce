// MediaUploader.tsx
"use client";

import React, { ChangeEvent } from "react";
import { useGlobalContext } from "@/context/GlobalContext";

export default function MediaUploader() {
  const { mediaFiles, addMedia, removeMedia } = useGlobalContext();

  const handleMediaChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
  
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_ADMIN}/archivos/upload-multiple`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (response.ok && data.files) {  // Cambia "archivos" a "files"
        addMedia(data.files);  // Cambia "archivos" a "files" aquí también
        console.log("type file ok: ",data.files)
        console.log("media files: ",mediaFiles)
      } else {
        console.error("No se encontraron archivos en la respuesta", data);
      }
    } catch (error) {
      console.error("Error al subir archivos:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Subir Imágenes o Videos
      </label>
      <input
        type="file"
        multiple
        accept="image/*,video/*"
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
        onChange={handleMediaChange}
      />

      <div className="mt-4 grid grid-cols-3 gap-4">
        {mediaFiles.map((media, index) => (
          <div key={index} className="relative">
            {media.type === "image" || "upload" ? (
              <img
                src={media.url}
                alt={`Media ${index + 1}`}
                className="w-full h-32 object-cover rounded shadow"
              />
            ) : (
              <video
                src={media.url}
                controls
                className="w-full h-32 object-cover rounded shadow"
              />
            )}
            <button
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
              onClick={() => removeMedia(index)}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

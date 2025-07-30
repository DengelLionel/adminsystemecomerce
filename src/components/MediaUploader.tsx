"use client";

import { supabase } from "@/supabase/client";
import React, { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { v4 as uuidv4 } from "uuid";
interface MediaUploaderProps {
  mediaFiles: { url: string, tipo: string }[];
  setMediaFiles: (files: { url: string, tipo: string }[]) => void;
}
const MediaUploader: React.FC<MediaUploaderProps> = ({ mediaFiles, setMediaFiles }) =>{
  const [uploading, setUploading] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files;
  if (!files) return;

  setUploading(true);
  const uploadedFiles: { url: string, tipo: string }[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `productos/${fileName}`;

    const { error } = await supabase.storage.from("productos").upload(filePath, file);
    if (error) {
      console.error("Upload error:", error.message);
      continue;
    }

    const { data } = supabase.storage.from("productos").getPublicUrl(filePath);
    if (data?.publicUrl) {
      uploadedFiles.push({ url: data.publicUrl, tipo: "imagen" }); // o "video" si detectas .mp4 u otro
    }
  }

  setMediaFiles((prev) => [...prev, ...uploadedFiles]);
  setUploadedUrls((prev) => [...prev, ...uploadedFiles.map(f => f.url)]);
  setUploading(false);
};

console.log("files media edit: ",mediaFiles)


  return (
    <div className="space-y-3">
      <label className="block text-sm text-gray-700 font-medium mb-1">Subir imágenes del producto</label>
      <div className="border border-dashed border-gray-400 rounded-md p-4 flex flex-col items-center justify-center">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleUpload}
          className="hidden"
          id="media-upload"
        />
        <label htmlFor="media-upload" className="cursor-pointer text-blue-600 hover:underline flex items-center gap-2">
          <FiUploadCloud /> Seleccionar archivos
        </label>
      </div>

      {uploading && <p className="text-sm text-gray-500">Subiendo...</p>}

     <div className="flex flex-wrap gap-3 mt-4">
  {[...mediaFiles, ...uploadedUrls.map(url => ({ url, tipo: 'imagen' }))].map((file, i) => (
    <img key={i} src={file.url} alt={`img-${i}`} className="w-24 h-24 object-cover rounded border" />
  ))}
</div>

    </div>
  );
};

export default MediaUploader;

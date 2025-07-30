"use client";

import React, { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/supabase/client";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Checkbox } from "@/components/ui/checkbox";

interface MediaUploaderProps {
  mediaFiles: { url: string; tipo: string }[];
  setMediaFiles: (files: { url: string; tipo: string }[]) => void;
}

const SortableImage = ({ url, index, isSelected, onSelect }: any) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: url });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };



  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative group"
    >
      <img
        src={url}
        alt="media"
        className="w-24 h-24 object-cover rounded border"
      />
      <div className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Checkbox checked={isSelected} onCheckedChange={onSelect} />
      </div>
    </div>
  );
};

const MediaUploader: React.FC<MediaUploaderProps> = ({ mediaFiles, setMediaFiles }) => {
  const [uploading, setUploading] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);
    const uploadedFiles: { url: string; tipo: string }[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileExt = file.name.split(".").pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `productos/${fileName}`;

      const { error } = await supabase.storage.from("productos").upload(filePath, file);
      if (error) {
        console.error("Upload error:", error.message);
        continue;
      }

      const { data } = supabase.storage.from("productos").getPublicUrl(filePath);
      if (data?.publicUrl) {
        uploadedFiles.push({ url: data.publicUrl, tipo: "imagen" });
      }
    }

    setMediaFiles((prev) => [...prev, ...uploadedFiles]);
    setUploading(false);
  };

  const handleDeleteSelected = () => {
    const remaining = mediaFiles.filter(file => !selected.has(file.url));
    setMediaFiles(remaining);
    setSelected(new Set());
  };

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

      {selected.size > 0 && (
        <button
          onClick={handleDeleteSelected}
          className="text-red-600 text-sm underline"
        >
          Eliminar
        </button>
      )}

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={({ active, over }) => {
          if (active.id !== over?.id) {
            const oldIndex = mediaFiles.findIndex((f) => f.url === active.id);
            const newIndex = mediaFiles.findIndex((f) => f.url === over?.id);
            const reordered = arrayMove(mediaFiles, oldIndex, newIndex);
            setMediaFiles(reordered);
          }
        }}
      >
        <SortableContext items={mediaFiles.map((f) => f.url)} strategy={verticalListSortingStrategy}>
          <div className="flex flex-wrap gap-3 mt-4">
            {mediaFiles.map((file, index) => (
              <SortableImage
                key={file.url}
                url={file.url}
                index={index}
                isSelected={selected.has(file.url)}
                onSelect={() => {
                  setSelected((prev) => {
                    const newSet = new Set(prev);
                    if (newSet.has(file.url)) newSet.delete(file.url);
                    else newSet.add(file.url);
                    return newSet;
                  });
                }}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default MediaUploader;

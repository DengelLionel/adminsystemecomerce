import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { useGlobalContext } from "../context/GlobalContext";

const TagInput: React.FC = () => {
  const { etiquetas, addTag, removeTag } = useGlobalContext();
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      const newTag = { id: Date.now(), nombre: inputValue.trim() }; // Crea un objeto de etiqueta con un id único temporal
      addTag(newTag);
      setInputValue("");
    }
  };

  const handleAddButtonClick = () => {
    if (inputValue.trim()) {
      const newTag = { id: Date.now(), nombre: inputValue.trim() };
      addTag(newTag);
      setInputValue("");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <label className="block text-sm mb-[10px] text-gray-500">Etiquetas</label>
      <div className="mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Escribe una etiqueta y presiona Enter"
          className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {etiquetas.map((tag) => (
          <div
            key={tag.id}
            className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
          >
            <span>{tag.nombre}</span>
            <button
              onClick={() => removeTag(tag)}
              className="ml-2 text-blue-700 hover:text-blue-900"
            >
              <FiX />
            </button>
          </div>
        ))}
      </div>

      {inputValue && (
        <button
          onClick={handleAddButtonClick}
          className="text-sm text-blue-600 bg-blue-100 px-3 py-1 rounded hover:bg-blue-200"
        >
          Agregar "{inputValue}"
        </button>
      )}
    </div>
  );
};

export default TagInput
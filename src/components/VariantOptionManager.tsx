"use client";

import React, { useState, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";

interface VariantOptionManagerProps {
  options: any[];
  setOptions: (options: any[]) => void;
}

const VariantOptionManager: React.FC<VariantOptionManagerProps> = ({ options, setOptions }) => {
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    if (options.length === 0) {
      setOptions([{ name: "", values: [""] }]);
      setEditIndex(0);
    }
  }, []);

  const handleAddOption = () => {
    setOptions((prev) => [...prev, { name: "", values: [""] }]);
    setEditIndex(options.length);
  };

  const handleOptionNameChange = (index: number, value: string) => {
    setOptions((prev) =>
      prev.map((option, i) => (i === index ? { ...option, name: value } : option))
    );
  };

  const handleValueChange = (optionIndex: number, valueIndex: number, value: string) => {
    setOptions((prev) =>
      prev.map((option, i) => {
        if (i === optionIndex) {
          const newValues = [...option.values];
          newValues[valueIndex] = value;

          if (value.trim() !== "" && valueIndex === newValues.length - 1) {
            newValues.push("");
          }

          return { ...option, values: newValues };
        }
        return option;
      })
    );
  };

  const handleDeleteOption = (index: number) => {
    setOptions((prev) => prev.filter((_, i) => i !== index));
    if (editIndex === index) setEditIndex(null);
  };

  const handleEditOption = (index: number) => {
    setEditIndex(index);
  };

const handleConfirmOption = () => {
  setOptions(prev => {
    const newOptions = prev.map((option, i) => {
      if (i === editIndex) {
        const cleanedValues = option.values.filter((v: string) => v.trim() !== "");
        return { ...option, values: cleanedValues };
      }
      return option;
    });

    return [...newOptions]; // 👈 Muy importante
  });

  setEditIndex(null);
};




  const handleDeleteValue = (optionIndex: number, valueIndex: number) => {
    setOptions((prev) =>
      prev.map((option, i) => {
        if (i === optionIndex) {
          const newValues = [...option.values];
          newValues.splice(valueIndex, 1);
          return { ...option, values: newValues };
        }
        return option;
      })
    );
  };

  return (
    <div className="space-y-6 pb-10">
      {options.length > 0 && (
        <h2 className="text-lg font-semibold">Variantes</h2>
      )}

      {options.map((option, index) => (
        <div key={index} className="border rounded-lg p-4 space-y-4">
          {editIndex === index ? (
            <>
              <input
                type="text"
                value={option.name}
                onChange={(e) => handleOptionNameChange(index, e.target.value)}
                placeholder="Nombre de la opción (ej: Color)"
                className="w-full p-2 border rounded"
              />

              {option.values.map((value, valueIndex) => (
                <div key={valueIndex} className="flex items-center space-x-3 mt-2">
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleValueChange(index, valueIndex, e.target.value)}
                    placeholder="Valor de la opción (ej: Rojo)"
                    className="flex-1 p-2 border rounded"
                  />
                  {option.values.length > 1 && (
                    <button onClick={() => handleDeleteValue(index, valueIndex)} className="text-red-500">
                      <FiTrash2 size={18} />
                    </button>
                  )}
                </div>
              ))}

              <button
                onClick={handleConfirmOption}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Listo
              </button>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{option.name}</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEditOption(index)}
                    className="text-blue-500 hover:underline text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteOption(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
               {option.values.filter((v: string) => v.trim() !== "").map((value, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-200 rounded-full text-sm">
                    {value}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      ))}

      <div className="flex justify-center">
        <button
          onClick={handleAddOption}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          + Agregar otra opción
        </button>
      </div>
    </div>
  );
};

export default VariantOptionManager;

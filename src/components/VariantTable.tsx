"use client";

import React, { useState } from "react";
import MassEditTable from "./MassEditTable";

interface VariantTableProps {
  variants: any[];
  setVariants: (variants: any[]) => void;
}

const VariantTable: React.FC<VariantTableProps> = ({ variants, setVariants }) => {
  const [selectedVariants, setSelectedVariants] = useState<number[]>([]);
  const [massEditMode, setMassEditMode] = useState(false);

  const handleVariantChange = (index: number, field: string, value: string | number) => {
    const updatedVariants = variants.map((variant, i) =>
      i === index ? { ...variant, [field]: value } : variant
    );
    setVariants(updatedVariants);
  };

  const toggleSelectAll = () => {
    if (selectedVariants.length === variants.length) {
      setSelectedVariants([]);
    } else {
      setSelectedVariants(variants.map((_, index) => index));
    }
  };

  const toggleSelectOne = (index: number) => {
    if (selectedVariants.includes(index)) {
      setSelectedVariants(selectedVariants.filter((i) => i !== index));
    } else {
      setSelectedVariants([...selectedVariants, index]);
    }
  };

  if (massEditMode) {
    return (
      <MassEditTable
        variants={variants}
        selectedVariants={selectedVariants}
        setMassEditMode={setMassEditMode}
        setVariants={setVariants}
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      {selectedVariants.length > 0 && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold">Seleccionados: {selectedVariants.length}</span>
          <button
            onClick={() => setMassEditMode(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Edición masiva
          </button>
        </div>
      )}
      <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-2 py-2">
              <input
                type="checkbox"
                checked={selectedVariants.length === variants.length}
                onChange={toggleSelectAll}
              />
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Variante</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Precio</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Disponible</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(variants) && variants.map((variant, index) => (
            <tr key={index} className="border-t">
              <td className="px-2 py-2">
                <input
                  type="checkbox"
                  checked={selectedVariants.includes(index)}
                  onChange={() => toggleSelectOne(index)}
                />
              </td>
              <td className="px-4 py-2 text-sm text-gray-600">
                {variant.nombre}
            
              </td>
              <td className="px-4 py-2">
                <input
                  type="number"
                  value={variant.precio || 0}
                  onChange={(e) => handleVariantChange(index, "precio", parseFloat(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="number"
                  value={variant.stock || 0}
                  onChange={(e) => handleVariantChange(index, "stock", parseInt(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VariantTable;

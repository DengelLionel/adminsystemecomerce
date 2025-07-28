"use client";

import React, { useEffect, useRef, useState } from "react";
import ColumnSelector from "./ColumnSelector";

interface MassEditTableProps {
  variants: any[];
  selectedVariants: number[];
  setMassEditMode: (value: boolean) => void;
  setVariants: (variants: any[]) => void;
}

const MassEditTable: React.FC<MassEditTableProps> = ({ variants, selectedVariants, setMassEditMode, setVariants }) => {
  const [dragging, setDragging] = useState(false);
  const [activeCell, setActiveCell] = useState<string | null>(null);
  const [visibleColumns, setVisibleColumns] = useState({
    precio: true,
    precio_comparativo: false,
    sku: true,
    codigo_barras: false,
    stock: true,
  });
  const [showSelector, setShowSelector] = useState(false);
  const draggedValue = useRef<string | number>("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleMassEditChange = (variantIndex: number, field: string, value: string | number) => {
    const updatedVariants = [...variants];
    updatedVariants[variantIndex] = {
      ...updatedVariants[variantIndex],
      [field]: value,
    };
    setVariants(updatedVariants);
  };

  const handleDragStart = (id: string, value: string | number) => {
    draggedValue.current = value;
    setDragging(true);
    setActiveCell(id);
  };

  const handleDragOver = (e: React.DragEvent, variantIndex: number, field: string) => {
    e.preventDefault();
    if (dragging && draggedValue.current !== "") {
      handleMassEditChange(variantIndex, field, draggedValue.current);
    }
  };

  const handleDragEnd = () => {
    setDragging(false);
    draggedValue.current = "";
  };

  const getCellId = (row: number, field: string) => `${row}-${field}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-11/12 max-w-6xl p-4 rounded-lg shadow-lg overflow-y-auto max-h-full">
        <div className="flex justify-between items-center mb-2 relative">
          <button
            onClick={() => setMassEditMode(false)}
            className="text-blue-500 hover:underline"
          >
            ← Atrás
          </button>
          <h2 className="text-base font-medium">Editando {selectedVariants.length} variantes</h2>
          <div className="relative">
            <button
              onClick={() => setShowSelector(!showSelector)}
              className="text-sm px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 border"
            >
              Columnas
            </button>
            {showSelector && (
              <ColumnSelector
                visibleColumns={visibleColumns}
                setVisibleColumns={setVisibleColumns}
              />
            )}
          </div>
        </div>

        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full text-sm text-gray-700 select-none">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">Título</th>
                {Object.entries(visibleColumns).filter(([_, show]) => show).map(([key]) => (
                  <th key={key} className="px-3 py-2 text-left font-semibold capitalize">
                    {key.replace("_", " ")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {selectedVariants.map((variantIndex, i) => (
                <tr key={variantIndex} className="border-b hover:bg-gray-50">
                  <td className="px-3 py-1 align-middle border-t border-gray-200">{variants[variantIndex].nombre}</td>
                  {Object.entries(visibleColumns).filter(([_, show]) => show).map(([field]) => {
                    const id = getCellId(i, field);
                    const value = variants[variantIndex][field] || "";
                    const isActive = activeCell === id;

                    return (
                      <td
                        key={field}
                        className="px-3 py-1 align-middle border-t border-gray-200 relative"
                      >
                        <div
                          className={`relative ${isActive ? 'border border-blue-600 bg-blue-50' : ''}`}
                          onClick={() => setActiveCell(id)}
                        >
                          <input
                            type="text"
                            inputMode={field !== 'sku' && field !== 'codigo_barras' ? 'numeric' : 'text'}
                            pattern={field !== 'sku' && field !== 'codigo_barras' ? "[0-9]*" : undefined}
                            value={value}
                            onChange={(e) => handleMassEditChange(variantIndex, field, field === 'sku' || field === 'codigo_barras' ? e.target.value : parseFloat(e.target.value) || 0)}
                            onDragOver={(e) => handleDragOver(e, variantIndex, field)}
                            className="w-full px-2 py-1 bg-transparent focus:outline-none"
                          />
                          {isActive && (
                            <div
                              className="absolute bottom-0 right-0 w-2 h-2 bg-blue-600 cursor-ns-resize"
                              onMouseDown={() => handleDragStart(id, value)}
                              onMouseUp={handleDragEnd}
                              draggable
                            ></div>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MassEditTable;

"use client";

import React from "react";

interface ColumnSelectorProps {
  visibleColumns: Record<string, boolean>;
  setVisibleColumns: (columns: Record<string, boolean>) => void;
}

const allColumns = [
  { key: "precio", label: "Precio" },
  { key: "precio_comparativo", label: "Precio de comparación" },
  { key: "sku", label: "SKU" },
  { key: "codigo_barras", label: "Código de barras" },
  { key: "stock", label: "Stock disponible" },
];

const ColumnSelector: React.FC<ColumnSelectorProps> = ({ visibleColumns, setVisibleColumns }) => {
  const toggleColumn = (key: string) => {
    setVisibleColumns({
      ...visibleColumns,
      [key]: !visibleColumns[key],
    });
  };

  return (
    <div className="absolute top-10 right-0 bg-white shadow-lg rounded-md p-4 w-64 z-50 border">
      <h4 className="font-semibold mb-2 text-gray-700">Columnas</h4>
      <ul className="space-y-2">
        {allColumns.map(({ key, label }) => (
          <li key={key} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={visibleColumns[key] ?? false}
              onChange={() => toggleColumn(key)}
              className="cursor-pointer"
            />
            <label className="text-sm text-gray-700 cursor-pointer">{label}</label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ColumnSelector;

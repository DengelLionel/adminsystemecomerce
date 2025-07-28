"use client";

import React, { useEffect, useState } from "react";
import VariantOptionManager from "./VariantOptionManager";
import VariantTable from "./VariantTable";
import { useGlobalContext } from "../context/GlobalContext";

interface ProductVariantManagerProps {
  variants?: any[];
  setVariants?: (v: any[]) => void;
  options?: any[];
  setOptions?: (o: any[]) => void;
}

const ProductVariantManager: React.FC<ProductVariantManagerProps> = ({
  variants: propVariants,
  setVariants: setPropVariants,
  options: propOptions,
  setOptions: setPropOptions,
}) => {
  const {
    variantsfinal,
    setVariantsfinal,
    optionsfinal,
    setOptionsfinal,
  } = useGlobalContext();

  const [localVariants, setLocalVariants] = useState<any[]>([]);
  const [localOptions, setLocalOptions] = useState<any[]>([]);

  const variants = propVariants ?? localVariants;
  const setVariants = setPropVariants ?? setLocalVariants;
  const options = propOptions ?? localOptions;
  const setOptions = setPropOptions ?? setLocalOptions;

  // Inicializa el campo editable desde el inicio si está vacío
  useEffect(() => {
    if (!options || options.length === 0) {
      setOptions([{ name: "", values: [""] }]);
    }
  }, []); // Solo una vez al montar

function generateCombinations(attributes: Record<string, string[]>): any[] {
  const keys = Object.keys(attributes);
  const combinations: any[] = [];

  function backtrack(index: number, current: any[]) {
    if (index === keys.length) {
      combinations.push([...current]);
      return;
    }
console.log("atributos: ",attributes)
    const key = keys[index];
    const values = Array.isArray(attributes[key]) ? attributes[key] : [];

    for (const value of values) {
      current.push({ atributoNombre: key, valor: value });
      backtrack(index + 1, current);
      current.pop();
    }
  }

  backtrack(0, []);

  return combinations.map((atributos) => ({
    nombre: atributos.map((a) => a.valor).join(' / '),
    precio: 0,
    stock: 0,
    imagenUrl: '',
    sku: '',
    codigo_barras: '',
    atributos,
  }));
}



useEffect(() => {
  if (!options) return;

  const filteredOptions = options
    .map((opt) => ({
      ...opt,
      values: opt.values.filter((v: string) => v.trim() !== ""),
    }))
    .filter((opt) => opt.name.trim() !== "" && opt.values.length > 0);

  // 🔁 Construye el attributeMap correctamente
  const attributeMap: Record<string, string[]> = {};
  filteredOptions.forEach((opt) => {
    attributeMap[opt.name] = opt.values;
  });

  if (filteredOptions.length > 0) {
    const newVariants = generateCombinations(attributeMap);
    setVariants(newVariants);
  } else {
    setVariants([]);
  }

  console.log("attributeMap:", attributeMap);
}, [options]);



  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold mb-4">Gestor de Variantes de Producto</h1>
      {options && setOptions && (
        <VariantOptionManager options={options} setOptions={setOptions} />
      )}
   {Array.isArray(variants) && variants.length > 0 && (
  <VariantTable variants={variants} setVariants={setVariants} />
)}


    </div>
  );
};

export default ProductVariantManager;

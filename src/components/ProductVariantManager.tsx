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

  const generateCombinations = (optionsArray: any[]) => {
    const valuesArray = optionsArray.map((option: any) =>
      option.values.filter((v: string) => v.trim() !== "")
    );
    const cartesian = (arrays: any[]) => {
      if (arrays.length === 0) return [[]];
      return arrays.reduce((acc, curr) => acc.flatMap((a) => curr.map((c) => [...a, c])), [[]]);
    };
    return cartesian(valuesArray).map((combination: any) => {
      return {
        nombre: combination.join(" / "),
        precio: 0,
        stock: 0,
        imagenUrl: '',
        sku: '',
        codigo_barras: '',
        atributos: combination.map((value: any, index: number) => ({
          atributoNombre: optionsArray[index].name,
          valor: value,
        })),
      };
    });
  };

  useEffect(() => {
    if (!options) return;
    const filteredOptions = options
      .map((opt) => ({
        ...opt,
        values: opt.values.filter((v: string) => v.trim() !== ""),
      }))
      .filter((opt) => opt.name.trim() !== "" && opt.values.length > 0);

    const isEditing = variantsfinal.length > 0;

    if (filteredOptions.length > 0 && !isEditing) {
      const newVariants = generateCombinations(filteredOptions);
      setVariants(newVariants);
      setVariantsfinal(newVariants);
      setOptionsfinal(filteredOptions);
    } else if (!isEditing) {
      setVariants([]);
      setVariantsfinal([]);
      setOptionsfinal([]);
    }
    console.log("variantes", variantsfinal)
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

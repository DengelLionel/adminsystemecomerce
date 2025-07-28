export const generateCombinations = (options: any[], existingVariants: any[] = []): any[] => {
    const validOptions = options
      .filter(option => option.name && option.values.length > 0)
      .map(option => ({
        name: option.name,
        values: Array.from(new Set(option.values)),
      }));
  
    if (validOptions.length === 0) return []; // Si no hay opciones válidas, retorna vacío
  
    const valuesArray = validOptions.map(option => option.values);
    const cartesian = (arrays: any[][]): any[][] => {
      if (arrays.length === 0) return [[]];
      return arrays.reduce((acc, curr) => acc.flatMap(a => curr.map(c => [...a, c])), [[]]);
    };
  
    const newCombinations = cartesian(valuesArray).map((combination) => {
      const atributos = combination.map((valor: string, index: number) => ({
        atributoNombre: validOptions[index].name,
        valor,
      }));
  
      return {
        nombre: combination.filter(Boolean).join(' / '),
        precio: 0,
        stock: 0,
        imagenUrl:'',
        atributos,
      };
    });
  
    // Filtrar combinaciones que ya existen en `existingVariants`
    return newCombinations.filter(newCombination =>
      !existingVariants.some(existing => existing.nombre === newCombination.nombre)
    );
  };
  
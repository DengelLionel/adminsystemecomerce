import { FC } from "react";

interface SimpleInventoryInputProps {
  value?: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SimpleInventoryInput: FC<SimpleInventoryInputProps> = ({ value, onChange }) => {
  return (
    <div className="w-full p-4">
      <label htmlFor="inventory" className="block text-sm text-gray-500">
        Inventario
      </label>
      <input
        type="number"
        id="inventory"
        value={value}
        onChange={onChange}
        min={0}
        className="block w-full mt-2 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 placeholder-gray-400/70 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
        placeholder="Cantidad de inventario"
      />
    </div>
  );
};

export default SimpleInventoryInput;

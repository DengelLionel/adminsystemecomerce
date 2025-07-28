import { FC } from "react";

interface PriceInputProps {
  id: string;
  label: string;
  placeholder: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PriceInput: FC<PriceInputProps> = ({ id, label, placeholder, value, onChange }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm text-gray-500">
        {label}
      </label>
      <div className="relative mt-2">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">S/</span>
        <input
          type="number"
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="block w-full pl-8 pr-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 placeholder-gray-400/70 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
        />
      </div>
    </div>
  );
};

export default PriceInput;

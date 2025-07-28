"use client"
import { FC } from "react";

interface TextInputProps {
  id: string;
  label: string;
  placeholder: string;
  value?: string;
  name:string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: FC<TextInputProps> = ({ id, label, placeholder, value, onChange }) => {
  return (
    <div className="mt-[10px]">
      <label htmlFor={id} className="block text-sm text-gray-500">
        {label}
      </label>
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300"
      />
    </div>
  );
};

export default TextInput;

import React, { useState } from 'react';

const PasswordInput = ({ password, setPassword }:any) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-4 relative">
      <label htmlFor="password" className="block text-gray-600">
        Contraseña
      </label>
      <input
        type={showPassword ? 'text' : 'password'}
        id="password"
        name="password"
        className="w-full min-w-[350px] border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autoComplete="off"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
      >
        {showPassword ? (
          <svg
            className="h-5 w-5 text-gray-500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0-8 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12c0-1.02.13-2.02.37-3C5.27 6.94 8.22 5 12 5c3.78 0 6.73 1.94 8.63 4.74.24.98.37 1.98.37 3s-.13 2.02-.37 3C18.73 17.06 15.78 19 12 19c-3.78 0-6.73-1.94-8.63-4.74-.24-.98-.37-1.98-.37-3z"
            />
          </svg>
        ) : (
          <svg
            className="h-5 w-5 text-gray-500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0-8 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3.93 3.93c.86.86 1.67 1.67 2.37 2.37c.85.85 1.78 1.58 2.76 2.22c.98.65 2.02 1.23 3.11 1.68c1.09.45 2.23.8 3.37 1.11c1.14.3 2.28.54 3.37.75c1.1.2 2.19.36 3.21.52c1.02.16 2.03.25 2.91.34c.88.09 1.75.1 2.51.1h.05a.75.75 0 1 0 0-1.5h-.03c-.89 0-1.77-.01-2.68-.1c-.9-.09-1.8-.17-2.74-.35c-.94-.18-1.87-.39-2.79-.6c-.92-.21-1.82-.46-2.73-.71c-.9-.26-1.79-.55-2.66-.88c-.88-.33-1.75-.69-2.6-1.11c-.85-.41-1.67-.86-2.47-1.38c-.8-.52-1.57-1.09-2.31-1.72c-.74-.63-1.46-1.3-2.13-2.05c-.67-.75-1.32-1.54-1.96-2.4a.75.75 0 0 0-1.3.57c.01.15.04.3.07.45Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20.07 20.07c-.86-.86-1.67-1.67-2.37-2.37c-.85-.85-1.78-1.58-2.76-2.22c-.98-.65-2.02-1.23-3.11-1.68c-1.09-.45-2.23-.8-3.37-1.11c-1.14-.3-2.28-.54-3.37-.75c-1.1-.2-2.19-.36-3.21-.52c-1.02-.16-2.03-.25-2.91-.34c-.88-.09-1.75-.1-2.51-.1h-.05a.75.75 0 1 0 0 1.5h.03c.89 0 1.77.01 2.68.1c.9.09 1.8.17 2.74.35c.94.18 1.87.39 2.79.6c.92.21 1.82.46 2.73.71c.9.26 1.79.55 2.66.88c.88.33 1.75.69 2.6 1.11c.85.41 1.67.86 2.47 1.38c.8.52 1.57 1.09 2.31 1.72c.74.63 1.46 1.3 2.13 2.05c.67.75 1.32 1.54 1.96 2.4a.75.75 0 1 0 1.3-.57c-.01-.15-.04-.3-.07-.45Z"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

export default PasswordInput;

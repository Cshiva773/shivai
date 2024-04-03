import React from 'react';

export default function Form({ labelName, type, name, placeholder, value, handleChange, isSurpriseMe, handleSurpriseMe, photo, preview }) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <label htmlFor={name} className="text-lg font-medium text-gray-700">
          {labelName}
        </label>
        {isSurpriseMe && (
          <button
            type="button"
            onClick={handleSurpriseMe}
            className="font-semibold text-sm bg-purple-500 hover:bg-purple-600 focus:bg-purple-600 py-4 px-4 rounded-md text-white hover:text-white focus:text-white focus:outline-none transition-colors duration-300 ease-in-out"
          >
            Surprise me
          </button>
        )}
      </div>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        className="bg-transparent apparence-none border-b border-gray-300 text-gray-500 text-lg outline-none block w-full lg:w-[800px] mx-auto p-3"
       />
      
    </div>
  );
}

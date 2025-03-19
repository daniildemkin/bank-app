import React from 'react'

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input: React.FC<IInputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="w-full">
      {label && <label className="block text-base font-medium text-white mb-1">{label}</label>}
      <input
        className={`w-full px-3 py-2 border rounded-md focus: outline-none focus:ring-2 focus:ring-red-600 
          ${error ? 'border-red-600 focus: ring-red-600' : 'border-gray-300 focus: ring-blue-600'} 
          ${className}
          `}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
}

export default Input

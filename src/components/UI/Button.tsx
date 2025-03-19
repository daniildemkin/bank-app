import React, { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
}

const Button: React.FC<ButtonProps> = ({ children, isLoading, disabled, className, ...props }) => {
  const baseStyle =
    'w-full px-4 py-2 bg-white hover:bg-gray-100 text-red-600 font-medium rounded-md transition-colors duration-200 shadow-sm hover:shadow-md'
  return (
    <button
      {...props}
      className={`${baseStyle} ${className}`}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        children
      )}
    </button>
  )
}

export default Button

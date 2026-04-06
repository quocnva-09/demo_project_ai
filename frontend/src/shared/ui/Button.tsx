import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = true, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-[#5A52D5] text-white hover:bg-[#4E47C0] focus:ring-[#5A52D5] shadow-[0px_10px_20px_rgba(90,82,213,0.3)] hover:shadow-[0px_12px_24px_rgba(90,82,213,0.4)] active:translate-y-[1px] active:shadow-md",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-300",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-300"
  };

  const widthClass = fullWidth ? "w-full" : "";
  const spacing = "px-6 py-[16px]";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${spacing} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | null;
  type?: 'text' | 'password' | 'email' | 'tel';
}

export const Input: React.FC<InputProps> = ({ label, error, type = 'text', className = '', ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  const baseInputStyles = "w-full rounded-lg bg-[#F4F4FF] outline-none text-[#1A1A1A] placeholder-[#A5A6F6] transition-all focus:ring-2 focus:ring-[#5A52D5] border border-transparent";
  const errorStyles = error ? "border-red-500 focus:ring-red-500" : "focus:border-transparent";
  const paddingStyles = "px-[20px] py-[16px]";

  return (
    <div className="flex flex-col gap-[8px] w-full relative">
      {label && <label className="text-sm font-medium text-[#1A1A1A]">{label}</label>}
      <div className="relative w-full">
        <input
          {...props}
          type={inputType}
          className={`${baseInputStyles} ${errorStyles} ${paddingStyles} ${isPassword ? 'pr-[48px]' : ''} ${className}`}
        />
        {isPassword && (
           <button
             type="button"
             className="absolute right-[16px] top-1/2 -translate-y-1/2 text-[#A5A6F6] hover:text-[#5A52D5]"
             onClick={() => setShowPassword(!showPassword)}
           >
             {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
           </button>
        )}
      </div>
      {error && <span className="text-xs text-red-500 min-h-[16px]">{error}</span>}
    </div>
  );
};

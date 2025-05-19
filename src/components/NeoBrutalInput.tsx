import React from "react";

interface NeoBrutalInputProps {
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
  className?: string;
  prefix?: string;
  suffix?: string;
  error?: string;
}

const NeoBrutalInput: React.FC<NeoBrutalInputProps> = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  min,
  max,
  step,
  required = false,
  className = "",
  prefix,
  suffix,
  error,
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block font-brutal font-bold mb-2 text-neutral-900">
        {label}
        {required && <span className="text-error-500 ml-1">*</span>}
      </label>
      <div className="relative">
        {prefix && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="text-neutral-500 font-brutal">{prefix}</span>
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          required={required}
          className={`
            w-full px-4 py-2 
            bg-white 
            font-brutal 
            border-3 border-black 
            shadow-brutal 
            focus:outline-none focus:ring-0 
            focus:border-primary-500 
            focus:shadow-none focus:translate-x-1 focus:translate-y-1
            ${prefix ? "pl-8" : ""}
            ${suffix ? "pr-8" : ""}
            ${error ? "border-error-500 bg-error-50" : ""}
          `}
        />
        {suffix && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-neutral-500 font-brutal">{suffix}</span>
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-error-500 text-sm font-brutal">{error}</p>
      )}
    </div>
  );
};

export default NeoBrutalInput;

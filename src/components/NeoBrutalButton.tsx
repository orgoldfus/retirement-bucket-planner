import React from "react";

interface NeoBrutalButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?:
    | "primary"
    | "secondary"
    | "accent"
    | "success"
    | "warning"
    | "error";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const NeoBrutalButton: React.FC<NeoBrutalButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  disabled = false,
}) => {
  const variantClasses = {
    primary:
      "bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white",
    secondary:
      "bg-secondary-500 hover:bg-secondary-600 active:bg-secondary-700 text-white",
    accent: "bg-accent-500 hover:bg-accent-600 active:bg-accent-700 text-black",
    success:
      "bg-success-500 hover:bg-success-600 active:bg-success-700 text-white",
    warning:
      "bg-warning-500 hover:bg-warning-600 active:bg-warning-700 text-black",
    error: "bg-error-500 hover:bg-error-600 active:bg-error-700 text-white",
  };

  const sizeClasses = {
    sm: "px-3 py-1 text-sm",
    md: "px-5 py-2 text-base",
    lg: "px-8 py-3 text-lg",
  };

  const baseClasses =
    "font-brutal font-bold border-3 border-black shadow-brutal transition-transform active:translate-y-1 active:translate-x-1 active:shadow-none transform hover:-translate-y-0.5 hover:-translate-x-0.5 flex items-center justify-center";
  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed"
    : "cursor-pointer";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default NeoBrutalButton;

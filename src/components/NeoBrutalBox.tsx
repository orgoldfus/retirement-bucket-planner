import React from 'react';

interface NeoBrutalBoxProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'neutral';
}

const NeoBrutalBox: React.FC<NeoBrutalBoxProps> = ({
  children,
  title,
  className = '',
  variant = 'default'
}) => {
  const variantClasses = {
    default: 'bg-white',
    primary: 'bg-primary-100',
    secondary: 'bg-secondary-100',
    accent: 'bg-accent-100',
    neutral: 'bg-neutral-100'
  };

  return (
    <div className={`border-3 border-black shadow-brutal p-4 ${variantClasses[variant]} ${className}`}>
      {title && (
        <div className="mb-4 font-brutal font-bold text-xl border-b-3 border-black pb-2">
          {title}
        </div>
      )}
      {children}
    </div>
  );
};

export default NeoBrutalBox;
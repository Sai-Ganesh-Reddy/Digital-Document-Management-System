import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const getButtonClasses = () => {
    let classes = 'btn';
    
    // Variant
    if (variant === 'primary') classes += ' btn-primary';
    else if (variant === 'secondary') classes += ' btn-secondary';
    else if (variant === 'outline') classes += ' btn-outline';
    else if (variant === 'danger') classes += ' btn-danger';
    else if (variant === 'success') classes += ' btn-success';
    
    // Size
    if (size === 'sm') classes += ' btn-sm';
    else if (size === 'lg') classes += ' btn-lg';
    
    // Width
    if (fullWidth) classes += ' btn-full';
    
    // Loading state
    if (isLoading) classes += ' loading';
    
    return classes + ' ' + className;
  };
  
  return (
    <button
      className={getButtonClasses()}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <span className="spinner"></span>
      )}
      {icon && !isLoading && <span className="btn-icon">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
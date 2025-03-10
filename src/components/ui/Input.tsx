import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = '', ...props }, ref) => {
    return (
      <div className="form-group">
        {label && (
          <label className="form-label">
            {label}
          </label>
        )}
        <div className="input-container">
          {icon && (
            <div className="input-icon">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`form-input ${error ? 'error' : ''} ${className}`}
            {...props}
          />
        </div>
        {error && <p className="input-error">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
import React, { forwardRef, memo, useMemo } from 'react';
import { ButtonProps } from '../../../types/button.types';
import { useRipple } from '../../../hooks/useRipple';
import { useKeyboard } from '../../../hooks/useKeyboard';

/**
 * A production-ready button component with accessibility, animations, and multiple variants
 * 
 * @param props - Button component props
 * @returns JSX.Element
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  ripple = true,
  ariaLabel,
  onClick,
  className = '',
  ...rest
}, ref) => {
  const { ripples, createRipple } = useRipple();
  const { handleKeyDown } = useKeyboard();

  // Memoized class names for performance
  const buttonClasses = useMemo(() => {
    const baseClasses = [
      'relative',
      'inline-flex',
      'items-center',
      'justify-center',
      'font-medium',
      'rounded-lg',
      'transition-all',
      'duration-200',
      'ease-in-out',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-offset-2',
      'active:scale-95',
      'select-none',
      'overflow-hidden'
    ];

    // Size variants
    const sizeClasses = {
      xs: 'px-2.5 py-1.5 text-xs',
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-4 py-2 text-base',
      xl: 'px-6 py-3 text-base'
    };

    // Color variants
    const variantClasses = {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 shadow-sm hover:shadow-md',
      secondary: 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500 shadow-sm hover:shadow-md',
      success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500 shadow-sm hover:shadow-md',
      warning: 'bg-yellow-500 hover:bg-yellow-600 text-white focus:ring-yellow-500 shadow-sm hover:shadow-md',
      danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-sm hover:shadow-md',
      ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-500 border border-gray-300 hover:border-gray-400'
    };

    const classes = [
      ...baseClasses,
      sizeClasses[size],
      variantClasses[variant]
    ];

    if (fullWidth) classes.push('w-full');
    if (disabled || loading) {
      classes.push('opacity-50', 'cursor-not-allowed', 'pointer-events-none');
    }

    return classes.join(' ');
  }, [variant, size, fullWidth, disabled, loading]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;
    
    if (ripple) {
      createRipple(event);
    }
    
    onClick?.(event);
  };

  return (
    <button
      ref={ref}
      className={`${buttonClasses} ${className}`}
      onClick={handleClick}
      onKeyDown={(e) => handleKeyDown(e, onClick)}
      disabled={disabled || loading}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      aria-busy={loading}
      aria-disabled={disabled || loading}
      role="button"
      tabIndex={disabled ? -1 : 0}
      {...rest}
    >
      {/* Loading Spinner */}
      {loading && (
        <svg 
          className="animate-spin -ml-1 mr-2 h-4 w-4" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}

      {/* Left Icon */}
      {leftIcon && !loading && (
        <span className="mr-2" aria-hidden="true">
          {leftIcon}
        </span>
      )}

      {/* Button Content */}
      <span className={loading ? 'opacity-70' : ''}>
        {children}
      </span>

      {/* Right Icon */}
      {rightIcon && !loading && (
        <span className="ml-2" aria-hidden="true">
          {rightIcon}
        </span>
      )}

      {/* Ripple Effects */}
      {ripple && ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full animate-ping pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            animationDuration: '600ms'
          }}
        />
      ))}
    </button>
  );
});

Button.displayName = 'Button';

export default memo(Button);
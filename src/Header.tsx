import React from 'react';
import { Button } from '../ui/Button';

interface HeaderProps {
  title: string;
  onThemeToggle?: () => void;
  isDark?: boolean;
}

/**
 * Application header with theme toggle
 */
export const Header: React.FC<HeaderProps> = ({
  title,
  onThemeToggle,
  isDark = false
}) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        
        <nav className="flex items-center space-x-4">
          {onThemeToggle && (
            <Button
              variant="outline"
              size="sm"
              onClick={onThemeToggle}
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
              {isDark ? '☀️' : '🌙'}
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};
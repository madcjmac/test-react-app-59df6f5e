import React from 'react';
import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  onThemeToggle?: () => void;
  isDark?: boolean;
}

/**
 * Main layout wrapper component
 */
export const Layout: React.FC<LayoutProps> = ({
  children,
  title = 'React App',
  onThemeToggle,
  isDark
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title={title} 
        onThemeToggle={onThemeToggle}
        isDark={isDark}
      />
      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
};
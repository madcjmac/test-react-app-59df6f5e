import { useCallback } from 'react';

export const useKeyboard = () => {
  const handleKeyDown = useCallback((
    event: React.KeyboardEvent<HTMLButtonElement>,
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick?.(event as any);
    }
  }, []);

  return { handleKeyDown };
};
import { useCallback, useState } from 'react';

interface AlertState {
  isShowing: boolean;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

export const useAlert = () => {
  const [alertState, setAlertState] = useState<AlertState>({
    isShowing: false,
    message: '',
    type: 'info'
  });

  const showAlert = useCallback((
    message: string, 
    type: AlertState['type'] = 'info'
  ) => {
    setAlertState({ isShowing: true, message, type });
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
      setAlertState(prev => ({ ...prev, isShowing: false }));
    }, 3000);
  }, []);

  const hideAlert = useCallback(() => {
    setAlertState(prev => ({ ...prev, isShowing: false }));
  }, []);

  return { alertState, showAlert, hideAlert };
};
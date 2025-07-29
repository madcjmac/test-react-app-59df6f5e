import { useState, useEffect } from 'react';
import { LoadingState, ApiResponse } from '../types';

/**
 * Generic API hook with loading states and error handling
 */
export function useApi<T>(
  fetcher: () => Promise<T>,
  dependencies: React.DependencyList = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<LoadingState>({
    isLoading: true,
    error: null
  });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading({ isLoading: true, error: null });
        const result = await fetcher();
        
        if (isMounted) {
          setData(result);
          setLoading({ isLoading: false, error: null });
        }
      } catch (error) {
        if (isMounted) {
          setLoading({
            isLoading: false,
            error: error instanceof Error ? error.message : 'An error occurred'
          });
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  return { data, ...loading };
}
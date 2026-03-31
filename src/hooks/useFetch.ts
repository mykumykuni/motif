import { useEffect, useState } from 'react';
import { apiClient } from '../services/api/client';

interface UseFetchOptions {
  skip?: boolean;
  refetchInterval?: number;
}

export function useFetch<T>(
  url: string,
  options: UseFetchOptions = {}
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(!options.skip);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (options.skip) return;

    let isMounted = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await apiClient.get(url);
        if (isMounted) {
          setData(response.data as T);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    if (options.refetchInterval) {
      const interval = setInterval(fetchData, options.refetchInterval);
      return () => clearInterval(interval);
    }

    return () => {
      isMounted = false;
    };
  }, [url, options]);

  const refetch = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get(url);
      setData(response.data as T);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, refetch };
}

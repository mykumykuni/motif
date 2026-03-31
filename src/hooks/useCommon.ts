import { useCallback, useState, useEffect } from 'react';

/**
 * Custom hook for handling async operations with loading and error states
 */
export const useAsync = <T,>(
  asyncFunction: () => Promise<T>,
  immediate = true
) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await asyncFunction();
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsLoading(false);
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { data, isLoading, error, execute };
};

/**
 * Custom hook for managing form state
 */
export const useForm = <T extends Record<string, any>>(initialState: T) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const handleChange = useCallback(
    (name: keyof T, value: any) => {
      setValues((prev) => ({ ...prev, [name]: value }));
      if (touched[name]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [touched]
  );

  const handleBlur = useCallback((name: keyof T) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
  }, []);

  const setFieldError = useCallback((name: keyof T, error: string) => {
    setErrors((prev) => ({ ...prev, [name]: error }));
  }, []);

  const reset = useCallback(() => {
    setValues(initialState);
    setErrors({});
    setTouched({});
  }, [initialState]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldError,
    reset,
    setValues,
  };
};

/**
 * Custom hook for handling debounced values
 */
export const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Custom hook for managing pagination
 */
export const usePagination = (initialPage = 1, pageSize = 20) => {
  const [page, setPage] = useState(initialPage);

  const goToPage = useCallback((newPage: number) => {
    setPage(Math.max(1, newPage));
  }, []);

  const nextPage = useCallback(() => {
    setPage((p) => p + 1);
  }, []);

  const previousPage = useCallback(() => {
    setPage((p) => Math.max(1, p - 1));
  }, []);

  return {
    page,
    pageSize,
    offset: (page - 1) * pageSize,
    goToPage,
    nextPage,
    previousPage,
  };
};

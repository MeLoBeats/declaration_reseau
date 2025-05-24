import { useState, useEffect } from 'react';

/**
 * A hook that returns a debounced version of a value.
 * @param value The value to debounce
 * @param delay The delay in milliseconds
 * @returns [debouncedValue, isDebouncing]
 */
const useDebouncedValue = <T,>(value: T, delay: number = 500): [T, boolean] => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const [isDebouncing, setIsDebouncing] = useState<boolean>(false);

  useEffect(() => {
    setIsDebouncing(true);
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
      setIsDebouncing(false);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, delay]);

  return [debouncedValue, isDebouncing];
};

export default useDebouncedValue;

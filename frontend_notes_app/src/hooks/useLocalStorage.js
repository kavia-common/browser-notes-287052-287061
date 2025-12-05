import { useEffect, useState } from 'react';

/**
 * Simple, safe localStorage hook with JSON serialization.
 * Handles SSR/disabled storage gracefully and validates parse errors.
 *
 * PUBLIC_INTERFACE
 */
export function useLocalStorage(key, initialValue) {
  /**
   * This is a public function hook to store and retrieve JSON-serializable values.
   * - key: string storage key
   * - initialValue: default value or a function returning it
   */
  // PUBLIC_INTERFACE
  const readValue = () => {
    if (typeof window === 'undefined') return getInitial();
    try {
      const item = window.localStorage.getItem(key);
      if (item === null) return getInitial();
      return JSON.parse(item);
    } catch {
      // Fallback to initial on parse error
      return getInitial();
    }
  };

  const getInitial = () =>
    typeof initialValue === 'function' ? initialValue() : initialValue;

  const [storedValue, setStoredValue] = useState(readValue);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      // Ignore quota or storage errors
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

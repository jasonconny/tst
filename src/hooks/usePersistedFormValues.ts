import { useState, useEffect } from 'react';

export function usePersistedFormValues(key: string, initialState: any) {
  const [state, setState] = useState(() => {
    const savedState = localStorage.getItem(key);
    return savedState ? JSON.parse(savedState) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

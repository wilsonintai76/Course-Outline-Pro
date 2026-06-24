import { useState, useRef, useCallback } from 'react';

export function useUndoableState<T>(initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [history, setHistory] = useState<T[]>([initialValue]);
  const [index, setIndex] = useState(0);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const updateValue = useCallback(
    (newValue: T) => {
      setValue(newValue);

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = setTimeout(() => {
        setHistory((prev) => {
          // If we changed value, remove history after current index
          const newHistory = prev.slice(0, index + 1);
          newHistory.push(newValue);
          // Keep a limit
          if (newHistory.length > 50) newHistory.shift();
          return newHistory;
        });
        setIndex((prev) => Math.min(prev + 1, 50));
      }, 400); // 400ms debounce for history stack
    },
    [index]
  );

  const undo = useCallback(() => {
    if (index > 0) {
      const newIndex = index - 1;
      setIndex(newIndex);
      setValue(history[newIndex]);
      // clear timeout so we don't accidentally push the undone value to history
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    }
  }, [index, history]);

  const redo = useCallback(() => {
    if (index < history.length - 1) {
      const newIndex = index + 1;
      setIndex(newIndex);
      setValue(history[newIndex]);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    }
  }, [index, history]);

  const reset = useCallback((newValue: T) => {
    setValue(newValue);
    setHistory([newValue]);
    setIndex(0);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
  }, []);

  return {
    value,
    updateValue,
    undo,
    redo,
    canUndo: index > 0,
    canRedo: index < history.length - 1,
    reset,
  };
}

import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook to manage the display state of any component.
 * @param {boolean} [initialState=false] - The initial state.
 * @returns {[boolean, Function]} An array containing:
 * - `isDisplayed`: A boolean indicating whether the component is displayed.
 * - `toggleDisplay`: A function to toggle the component's display state.
 */
const useDisplay = (initialState = false) => {
  const [isDisplayed, setIsDisplayed] = useState(initialState);

  const toggleDisplay = () => {
    setIsDisplayed((prev) => !prev);
  };

  return [isDisplayed, toggleDisplay];
};

/**
 * Custom hook to detect clicks outside of the provided ref.
 * @param {Function} handler
 * @returns {Object} The ref object
 */

const useClickAway = (handler) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleMousedown = (event) => {
      if (ref.current && !ref.current.contains(event.target)) handler();
    };
    document.addEventListener('mousedown', handleMousedown);
    return () => {
      document.removeEventListener('mousedown', handleMousedown);
    };
  }, [handler]);

  return ref;
};
/**
 * Custom hook that debounces a value after the specified delay.
 * @param {any} value - The value to be debounced.
 * @param {number} delay - The delay in milliseconds.
 * @returns {any} - The debounced value.
 */
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearInterval(timeoutId);
  }, [value, delay]);

  return debouncedValue;
};

export { useDisplay, useClickAway, useDebounce };

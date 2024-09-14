import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook to manage the state of an authentication modal.
 * @returns {[boolean, Function]} An array containing:
 * - `showAuthModal`: A boolean indicating whether the modal is visible.
 * - `toggleAuthModalClick`: A function to toggle the modal's visibility.
 */

const useAuthModal = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const toggleAuthModalClick = () => {
    setShowAuthModal((prev) => !prev);
  };

  return [showAuthModal, toggleAuthModalClick];
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
}



export { useAuthModal, useClickAway }; 


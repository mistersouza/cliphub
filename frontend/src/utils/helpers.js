import { useState } from 'react';

const useAuthModal = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const toggleAuthModalClick = () => {
    setShowAuthModal((prev) => !prev);
  };

  return [showAuthModal, toggleAuthModalClick];
};

export { useAuthModal }; 


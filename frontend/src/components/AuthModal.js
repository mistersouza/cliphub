import { useEffect, useRef, useState } from 'react';
import { ImCancelCircle } from 'react-icons/im';
import SignUpForm from './auth/SignUpForm';
import LogInForm from './auth/LogInForm';

const Modal = ({ modal, handleModalClick }) => {
  const [isSignedUp, setIsSignedUp] = useState(true);
  const modalRef = useRef();

  const handleMousedown = ({ target }) => {
    console.log("Clicked outside the dropdown");
    if (modalRef.current && !modalRef.current.contains(target)) handleModalClick();
  };

  useEffect(() => {
    if (modal) document.addEventListener('mousedown', handleMousedown);
    return () => {
      document.removeEventListener('mousedown', handleMousedown);
    };
  }, [modal]);

  return (
    <div
      className=
        {`${!modal ? 'hidden' : 'fixed'} inset-0 flex items-center justify-center bg-gray-800 
        bg-opacity-60 backdrop-blur-sm z-50`}
    >
      <div
        className="flex flex-col gap-3 bg-white rounded shadow-lg w-1/5"
        ref={modalRef}
      >
        <button
          className="self-end text-2xl p-3"
          onClick={handleModalClick}
        >
          <ImCancelCircle />
        </button>
        <h2 className="flex-1 text-3xl text-center font-semibold">
          {isSignedUp ? 'Log in to ClipHub' : 'Sign up for ClipHub'}
        </h2>
        <div className="px-7">
          {isSignedUp ? (
            <LogInForm handleModalClick={handleModalClick} />
          ) : (
            <SignUpForm handleModalClick={handleModalClick} />
          )}
        </div>
        <div className="text-xs text-gray-500 text-center p-2">
          <p>
            By continuing, you agree to ClipHub's{' '}
            <span className="text-gray-800 underline cursor-pointer">
              Terms of Service
            </span>{' '}
            and confirm that you have read ClipHub's{' '}
            <span className="text-gray-800 underline cursor-pointer">
              Privacy Policy
            </span>
          </p>
        </div>
        <div className="border-t border-gray-500 text-sm text-center py-5">
          <p>
            {isSignedUp
              ? "Don't have an account?"
              : 'Already have an account?'}{' '}
            <span
              onClick={() => setIsSignedUp((prev) => !prev)}
              className="
                text-gray-500 text-base cursor-pointer hover:underline 
                hover:underline-offset-2
              "
            >
              {isSignedUp ? 'Sign up' : 'Log in'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;

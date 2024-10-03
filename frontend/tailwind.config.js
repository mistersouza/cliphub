/** @type {import('tailwindcss').Config} */
import tailwindScrollbar from 'tailwind-scrollbar';

export const content = ['./src/**/*.{js,jsx,ts,tsx}'];

export const theme = {
  extend: {
    animation: {
      'grow-fade': 'grow-fade 1.5s ease-in-out infinite',
    },
    keyframes: {
      'grow-fade': {
        '0%, 100%': {
          transform: 'scale(0.5)',
          opacity: '0',
        },
        '50%': {
          transform: 'scale(1)',
          opacity: '1',
        },
      },
    },
  },
};

export const plugins = [tailwindScrollbar({ nocompatible: true })];

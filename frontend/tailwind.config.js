/** @type {import('tailwindcss').Config} */
import tailwindScrollbar from 'tailwind-scrollbar';

export const content = ['./src/**/*.{js,jsx,ts,tsx}'];
export const theme = {
  extend: {},
};
export const plugins = [tailwindScrollbar({ nocompatible: true })];

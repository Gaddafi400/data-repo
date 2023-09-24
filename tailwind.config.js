/** @type {import('tailwindcss').Config} */

import typography from '@tailwindcss/typography';
import daisyui from 'daisyui';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#8e8eb1',
          200: '#7373a4',
          300: '#595987',
          400: '#40406b',
          500: '#292949', // Base color
          600: '#21213e',
          700: '#181831',
          800: '#101026',
          900: '#08081a',
        },
        secondary: {
          first: '#BBCAFF',
        },
        transparent: 'transparent',
        current: 'currentColor',
        white: '#ffffff',
        purple: '#3f3cbb',
        midnight: '#121063',
        metal: '#565584',
        tahiti: '#3ab7bf',
        silver: '#ecebff',
        'bubble-gum': '#ff77e9',
        bermuda: '#78dcca',
        footer: '#EBB044',
      },
      maxWidth: {
        '9xl': '90rem',
      },
    },
  },
  plugins: [typography, daisyui],
  daisyui: {
    themes: ['winter', 'dracula'],
  },
};

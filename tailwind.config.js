/** @type {import('tailwindcss').Config} */

import typography from '@tailwindcss/typography';
import daisyui from 'daisyui';
import flowbite from 'flowbite/plugin'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'hsl(240, 17%, 80%)',
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
          lightest: '#D6E2FF',
          lighter: '#A3BCFF',
          darker: '#5E7A96',
          darkest: '#374151',
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
      screens: {
        sm: '640px', // Small screens and up
        md: '768px', // Medium screens and up
        lg: '1024px', // Large screens and up
        xl: '1280px', // Extra-large screens and up
        xx: '1580px', // Extra-large screens and up
      },
    },
  },
  plugins: [typography, daisyui, flowbite],
  daisyui: {
    themes: ['winter', 'dracula'],
  },
};

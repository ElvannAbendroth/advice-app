/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    fontSize: {
      '2xs': '0.6rem',
      ...defaultTheme.fontSize,
    },
    extend: {
      colors: {
        transparent: 'transparent',
        background: '#202632',
        foreground: '#D1DFEA',
        card: '#313A49',
        primary: { DEFAULT: '#56FDAA', hover: '#87FFC3' },
      },
      fontFamily: {
        sans: ['Satoshi', ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'spin-slow': 'spin-slow 3s linear infinite', // Adjust the duration as needed
      },
    },
  },
  plugins: [],
}

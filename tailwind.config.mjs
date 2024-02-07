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
        background: '#202632',
        foreground: '#D1DFEA',
        card: '#313A49',
        primary: { DEFAULT: '#56FDAA', hover: '#87FFC3' },
      },

      fontFamily: {
        sans: ['Satoshi', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}

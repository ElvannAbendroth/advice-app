/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        background: '#202632',
        foreground: '#313A49',
        card: '#56FDAA',
        primary: '#D1DFEA',
      },
    },
  },
  plugins: [],
}

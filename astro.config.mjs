import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import netlify from '@astrojs/netlify'
import vercel from '@astrojs/vercel/serverless'
import clerk from '@clerk/astro'
import { shadesOfPurple } from '@clerk/themes'

import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    react(),
    clerk({
      appearance: {
        baseTheme: [shadesOfPurple],
        variables: { colorPrimary: '#56FDAA', colorBackground: '#313A49' },
      },
    }),
  ],
  output: 'server',
  adapter: netlify(),
  adapter: vercel(),
})

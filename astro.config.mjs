import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import netlify from '@astrojs/netlify'
import node from '@astrojs/node'
import clerk from '@clerk/astro'

import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react(), clerk()],
  output: 'server',
  adapter: netlify(),
  // adapter: node({ mode: 'standalone' }),
  output: 'server',
})

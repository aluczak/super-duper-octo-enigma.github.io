import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repoName = 'super-duper-octo-enigma.github.io'

// https://vite.dev/config/
export default defineConfig({
  base: `/${repoName}/`,
  plugins: [react()],
})

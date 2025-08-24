import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    define: {
      // Expose env variables to the client
      __OPENAI_API_KEY__: JSON.stringify(env.VITE_OPENAI_API_KEY),
      __OPENAI_API_BASE_URL__: JSON.stringify(env.VITE_OPENAI_API_BASE_URL || 'https://api.openai.com/v1'),
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.js', // We'll create this file
    },
  }
})

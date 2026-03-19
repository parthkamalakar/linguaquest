import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/linguaquest/', // 👈 Replace "linguaquest" with your exact repo name
})

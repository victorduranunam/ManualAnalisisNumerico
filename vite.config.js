import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // En producción usa la ruta absoluta de cozumel, en desarrollo usa la raíz '/'
  base: mode === 'production' ? '/victord/ManualAnalisisNumerico/' : '/',
}))
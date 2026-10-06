import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

function groqApiDevPlugin() {
  return {
    name: 'groq-api-dev-plugin',
    configureServer(server: any) {
      server.middlewares.use('/api/chat', async (req: any, res: any) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        if (req.method === 'OPTIONS') {
          res.statusCode = 200;
          res.end();
          return;
        }

        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        let bodyData = '';
        req.on('data', (chunk: any) => {
          bodyData += chunk;
        });

        req.on('end', async () => {
          try {
            const body = JSON.parse(bodyData || '{}');
            const handlerModule = await server.ssrLoadModule(path.resolve(__dirname, 'api/chat.ts'));
            const mockReq = { ...req, body };
            const mockRes = {
              setHeader(k: string, v: string) {
                res.setHeader(k, v);
              },
              status(code: number) {
                res.statusCode = code;
                return {
                  json(data: any) {
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(data));
                  },
                  end() {
                    res.end();
                  },
                };
              },
            };
            await handlerModule.default(mockReq, mockRes);
          } catch (err: any) {
            console.error('Error in dev /api/chat middleware:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Dev server error', message: err?.message }));
          }
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    groqApiDevPlugin(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    target: 'es2020',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        // Stable vendor chunks: they stay cached across deploys and download in parallel
        manualChunks(id: string) {
          if (!id.includes('node_modules')) return;
          if (id.includes('/three/')) return 'three';
          if (id.includes('/react-dom/') || id.includes('/react/') || id.includes('/scheduler/')) return 'vendor-react';
          if (id.includes('/motion') || id.includes('/framer-motion/')) return 'vendor-motion';
          if (id.includes('/lucide-react/')) return 'vendor-icons';
        },
      },
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})

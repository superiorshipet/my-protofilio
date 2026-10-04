import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n.ts'
// import './index.css'
import App from './App.tsx'

// Fix for React DevTools semver error when React 19 is used or version string is empty
if (typeof window !== 'undefined') {
  const windowObj = window as unknown as Record<string, unknown>;
  if (windowObj.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
    const hook = windowObj.__REACT_DEVTOOLS_GLOBAL_HOOK__ as Record<string, unknown>;
    if (typeof hook.registerRendererInterface === 'function') {
      const originalRegister = hook.registerRendererInterface.bind(hook);
      hook.registerRendererInterface = function (renderer: Record<string, unknown>, ...args: unknown[]) {
        if (renderer && (!renderer.version || typeof renderer.version !== 'string' || renderer.version.trim() === '')) {
          renderer.version = '19.0.0';
        }
        return originalRegister(renderer, ...args);
      };
    }
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

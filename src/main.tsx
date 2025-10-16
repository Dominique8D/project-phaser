import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { LanguageProvider } from './context/language-context.tsx';
import { ThemeProviderWrapper } from './theme/theme-provider-wrapper.tsx';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { GAME_ROUTES } from './config/game-config.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LanguageProvider>
      <ThemeProviderWrapper>
        <HashRouter>
          <Routes>
            <Route path='/' element={<App />} />
            {GAME_ROUTES.map(({ path, component: Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Routes>
        </HashRouter>
      </ThemeProviderWrapper>
    </LanguageProvider>
  </React.StrictMode>,
);

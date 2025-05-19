import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { LanguageProvider } from './context/language-context.tsx';
import { ThemeProviderWrapper } from './theme/theme-provider-wrapper.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LanguageProvider>
      <ThemeProviderWrapper>
        <App />
      </ThemeProviderWrapper>
    </LanguageProvider>
  </React.StrictMode>,
);

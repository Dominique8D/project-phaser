import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const DEFAULT_LANG = 'nl';
const VALID_LANGUAGES = ['nl', 'gb'];

function getValidQueryLang(): string {
  const urlParams = new URLSearchParams(window.location.search);
  const queryLang = urlParams.get('lang');
  return VALID_LANGUAGES.includes(queryLang ?? '') ? queryLang! : DEFAULT_LANG;
}

const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const queryLang = getValidQueryLang();
  const [language, setLanguage] = useState(queryLang);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export { LanguageProvider, useLanguage };


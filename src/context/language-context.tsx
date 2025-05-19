import React, { createContext, useContext, useState, ReactNode } from 'react';
import { getValidQueryParam } from '../utils/get-valid-query-param';
import useUpdateQueryParam from '../custom-hooks/use-update-query-param';

interface LanguageContextType {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const PARAM_KEY = 'lang'
const DEFAULT_LANG = 'nl';
const VALID_LANGUAGES = ['nl', 'gb'];

const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const queryLang = getValidQueryParam(PARAM_KEY, VALID_LANGUAGES, DEFAULT_LANG);
  const [language, setLanguage] = useState(queryLang);
  useUpdateQueryParam(PARAM_KEY, language);

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


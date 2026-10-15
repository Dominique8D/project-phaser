import { useState, createContext, useContext, ReactNode } from 'react';
import { getValidQueryParam } from '../utils/get-valid-query-param';
import useUpdateQueryParam from '../custom-hooks/use-update-query-param';
import styles from './theme-provider-wrapper.module.css';

export const LIGHT = 'light';
export const DARK = 'dark';
export type MODE = typeof LIGHT | typeof DARK;

const ThemeContext = createContext({ mode: DARK, toggleTheme: () => {} });

export const useThemeProvider = () => useContext(ThemeContext);

const PARAM_KEY = 'mode';
const DEFAULT_MODE = DARK;
const VALID_MODES = [LIGHT, DARK];

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProviderWrapper: React.FC<ThemeProviderProps> = ({ children }) => {
  const queryMode = getValidQueryParam(PARAM_KEY, VALID_MODES, DEFAULT_MODE);
  const [mode, setMode] = useState<MODE>(queryMode as MODE);
  useUpdateQueryParam(PARAM_KEY, mode);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === LIGHT ? DARK : LIGHT));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <div className={styles.root} data-theme={mode}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

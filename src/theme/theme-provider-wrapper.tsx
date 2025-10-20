import { createTheme, SxProps, ThemeProvider } from '@mui/material/styles';
import { useState, createContext, useContext, ReactNode } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Stack } from '@mui/material';
import { getValidQueryParam } from '../utils/get-valid-query-param';
import { getThemeOptions } from './theme-options';
import useUpdateQueryParam from '../custom-hooks/use-update-query-param';

const DEFAULT_STYLING: SxProps = {
  height: '100vh',
  width: '100vw',
  alignItems: 'center',
  justifyItems: 'center',
};

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

  const theme = createTheme(getThemeOptions(mode));

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === LIGHT ? DARK : LIGHT));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Stack sx={DEFAULT_STYLING}>{children}</Stack>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};


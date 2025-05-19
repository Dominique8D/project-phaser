import { createTheme, SxProps, ThemeProvider } from '@mui/material/styles';
import { useState, createContext, useContext, ReactNode } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Stack } from '@mui/material';
import { themeOptions } from './theme-options';

const DEFAULT_STYLING: SxProps = {
  height: '100vh',
  width: '100vw',
  alignItems: 'center',
  justifyItems: 'center',
};

export const LIGHT = 'light';
export const DARK = 'dark';

const ThemeContext = createContext({ mode: DARK, toggleTheme: () => {} });

export const useThemeProvider = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProviderWrapper: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<typeof LIGHT | typeof DARK>(DARK);

  const theme = createTheme({
    ...themeOptions,
    palette: {
      ...themeOptions.palette,
      mode,
    },
  });

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


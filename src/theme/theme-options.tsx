import { ThemeOptions } from '@mui/material/styles';
import { MODE } from './theme-provider-wrapper';

export const getThemeOptions = (mode: MODE): ThemeOptions => {
  const isDark = mode === 'dark';

  return {
    typography: {
      fontFamily: ['Orbitron', 'Audiowide', 'Unbounded', 'Arial', 'sans-serif'].join(','),
    },
    palette: {
      mode,
      primary: {
        main: isDark ? '#0033aa' : '#007aff',
        light: isDark ? '#3366ff' : '#66aaff',
        dark: isDark ? '#001f66' : '#0051a8',
        contrastText: '#ffffff',
      },
      secondary: {
        main: isDark ? '#00e676' : '#00c853',
        light: isDark ? '#33f18c' : '#5cf28f',
        dark: isDark ? '#00a653' : '#009944',
        contrastText: '#000000',
      },
      background: {
        default: isDark ? '#000000ff' : '#ffffffff',
        paper: isDark ? '#12161c' : '#ffffff',
      },
      text: {
        primary: isDark ? '#e0e0e0' : '#1a1a1a',
        secondary: isDark ? '#9e9e9e' : '#4a4a4a',
      },
      divider: isDark ? '#2c2f33' : '#e0e0e0',
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          colorPrimary: {
            backgroundColor: isDark ? '#001a4d' : '#007aff',
          },
        },
      },
    },
  };
};


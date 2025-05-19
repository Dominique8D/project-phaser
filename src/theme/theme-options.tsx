import { ThemeOptions } from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
  typography: {
    fontFamily: ['"Capriola"', 'Arial', 'sans-serif'].join(','),
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#0065ff',
    },
    secondary: {
      main: '#00e676',
    },
  },
};

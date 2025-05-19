import { Stack, Box, IconButton } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useThemeProvider, LIGHT } from './theme-provider-wrapper';

const ThemeToggleButton = () => {
  const { toggleTheme, mode } = useThemeProvider();
  const isLightMode = mode === LIGHT;

  return (
    <Stack>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <IconButton color='secondary' onClick={toggleTheme}>
          {isLightMode ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Box>
    </Stack>
  );
};

export default ThemeToggleButton;


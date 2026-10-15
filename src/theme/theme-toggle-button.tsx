import useLangTranslation from '../custom-hooks/use-lang-translation';
import { IconButton } from '../components/icon-button';
import { MoonIcon, SunIcon } from '../components/icons';
import { useThemeProvider, LIGHT } from './theme-provider-wrapper';

const ThemeToggleButton = () => {
  const { toggleTheme, mode } = useThemeProvider();
  const isLightMode = mode === LIGHT;
  const { t } = useLangTranslation('common');

  return (
    <IconButton
      onClick={toggleTheme}
      label={t(isLightMode ? 'switchToDark' : 'switchToLight')}
    >
      {isLightMode ? <MoonIcon /> : <SunIcon />}
    </IconButton>
  );
};

export default ThemeToggleButton;

import { Stack, Typography, Link, useTheme, useMediaQuery } from '@mui/material';
import { GAME_ROUTES } from '../config/game-config';
import useLangTranslation from '../custom-hooks/use-lang-translation';

const GameSelector: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { t } = useLangTranslation('common');
  const { t: tGameRoutes } = useLangTranslation('gameRoutes');

  return (
    <Stack
      sx={{
        height: '100vh',
        width: '100%',
        padding: 2,
        background: `linear-gradient(90deg, ${theme.palette.background.default}, ${theme.palette.secondary.main}80, ${theme.palette.background.default})`,
        justifyContent: 'center',
        alignItems: 'center',
        boxSizing: 'border-box',
      }}
      spacing={2}
    >
      <Typography variant='h6'>{t('gameSelect')}</Typography>

      <Stack
        direction={isMobile ? 'column' : 'row'}
        spacing={2}
        alignItems='center'
        justifyContent='center'
      >
        {GAME_ROUTES.map(({ tKey, path, value }) => (
          <Link key={value} href={`#${path}`} underline='hover'>
            {tGameRoutes(tKey)}
          </Link>
        ))}
      </Stack>
    </Stack>
  );
};

export default GameSelector;


import { Stack, Typography, Link, useTheme, useMediaQuery } from '@mui/material';
import { GAME_ROUTES } from '../config/game-config';

const GameSelector: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Stack
      sx={{
        height: '100vh',
        width: '100%',
        padding: 2,
        background: 'linear-gradient(135deg, rgba(0, 102, 255, 0.24), #ffffff)',
        justifyContent: 'center',
        alignItems: 'center',
        boxSizing: 'border-box',
      }}
      spacing={2}
    >
      <Typography variant='h6'>Game Select</Typography>

      <Stack
        direction={isMobile ? 'column' : 'row'}
        spacing={2}
        alignItems='center'
        justifyContent='center'
      >
        {GAME_ROUTES.map(({ label, path, value }) => (
          <Link key={value} href={`#${path}`} underline='hover'>
            {label}
          </Link>
        ))}
      </Stack>
    </Stack>
  );
};

export default GameSelector;


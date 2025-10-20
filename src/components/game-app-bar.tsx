import { AppBar, Toolbar, Stack, IconButton, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { Link as RouterLink } from 'react-router-dom';
import ThemeToggleButton from '../theme/theme-toggle-button';
import LangSelector from './lang-selector';

type GameAppBarProps = {
  title: string;
};

const GameAppBar: React.FC<GameAppBarProps> = ({ title = '' }) => {
  return (
    <AppBar position='sticky' color='primary'>
      <Toolbar>
        <Stack direction='row' alignItems='center' width='100%' spacing={2}>
          <IconButton component={RouterLink} to='/' color='inherit' aria-label='home' size='large'>
            <HomeIcon />
          </IconButton>

          <Stack flex={1} alignItems='center'>
            <Typography variant='h6' component='div'>
              {title}
            </Typography>
          </Stack>

          <Stack direction='row' spacing={2}>
            <ThemeToggleButton />
            <LangSelector />
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default GameAppBar;


import { ReactNode } from 'react';
import { Stack, Theme } from '@mui/material';
import GameAppBar from '../components/game-app-bar';

const APP_HEADER_HEIGHT = 64;

const EXTRA_STACK_DIR = 'column';
const EXTRA_STACK_SPACING = 1;
const EXTRA_STACK_SX = {
  width: { xs: '100%', md: 200 },
  flexGrow: { xs: 1, md: 0 },
  padding: 1,
  backgroundColor: 'background.paper',
  boxSizing: 'border-box',
};
const EXTRA_CHILD_EXAMPLE_SX = {
  flex: 1,
  borderRadius: 1,
  padding: 1,
};

type GameLayoutProps = {
  title: string;
  children: ReactNode;
  footer?: ReactNode;
};

const gradientSX = (theme: Theme) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.light})`,
});

const GameLayout: React.FC<GameLayoutProps> = ({ title, children, footer }) => {
  return (
    <>
      <GameAppBar title={title} />
      <Stack p={2} gap={2} sx={{ height: `calc(100vh - ${APP_HEADER_HEIGHT}px)` }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          sx={{ flexGrow: 1, width: '100%', overflow: 'hidden' }}
        >
          <Stack direction={EXTRA_STACK_DIR} spacing={EXTRA_STACK_SPACING} sx={EXTRA_STACK_SX}>
            <Stack
              sx={(theme) => ({
                ...EXTRA_CHILD_EXAMPLE_SX,
                ...gradientSX(theme),
              })}
            />
          </Stack>

          <Stack
            sx={{
              flexGrow: 2,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#f5f5f5',
              overflow: 'hidden',
              padding: 1,
              '& canvas': {
                width: '100% !important',
                height: 'auto !important',
                display: 'block',
              },
            }}
          >
            {children}
          </Stack>

          <Stack direction={EXTRA_STACK_DIR} spacing={EXTRA_STACK_SPACING} sx={EXTRA_STACK_SX}>
            <Stack
              sx={(theme) => ({
                ...EXTRA_CHILD_EXAMPLE_SX,
                ...gradientSX(theme),
              })}
            />
          </Stack>
        </Stack>

        {footer && (
          <Stack direction='row' justifyContent='center' alignItems='center'>
            {footer}
          </Stack>
        )}
      </Stack>
    </>
  );
};

export default GameLayout;


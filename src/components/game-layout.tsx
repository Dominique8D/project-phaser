import { ReactNode } from 'react';
import { Stack, Theme } from '@mui/material';
import GameAppBar from '../components/game-app-bar';

const APP_HEADER_HEIGHT = 64;

const SIDE_PANEL_SX = {
  width: { xs: '100%', md: 200 },
  flexGrow: { xs: 1, md: 0 },
  padding: 1,
  backgroundColor: 'background.paper',
  boxSizing: 'border-box',
};

const MAIN_CANVAS_SX = {
  flexGrow: 2,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'background.paper',
  overflow: 'hidden',
  padding: 1,
  '& canvas': {
    width: '100% !important',
    height: 'auto !important',
    display: 'block',
  },
};

const gradientBoxSx = (theme: Theme) => ({
  flex: 1,
  borderRadius: 1,
  padding: 1,
  background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.light})`,
});

const GradientBox = ({ children }: { children?: ReactNode }) => (
  <Stack sx={(theme) => gradientBoxSx(theme)}>{children}</Stack>
);

type GameLayoutProps = {
  title: string;
  children: ReactNode;
  startContent?: ReactNode;
  endContent?: ReactNode;
};

const GameLayout: React.FC<GameLayoutProps> = ({ title, children, startContent, endContent }) => {
  return (
    <>
      <GameAppBar title={title} />
      <Stack p={2} gap={2} sx={{ height: `calc(100vh - ${APP_HEADER_HEIGHT}px)` }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          sx={{ flexGrow: 1, width: '100%', overflow: 'hidden' }}
        >
          <Stack direction='column' spacing={1} sx={SIDE_PANEL_SX}>
            <GradientBox>{startContent}</GradientBox>
          </Stack>

          <Stack sx={MAIN_CANVAS_SX}>{children}</Stack>

          <Stack direction='column' spacing={1} sx={SIDE_PANEL_SX}>
            <GradientBox>{endContent}</GradientBox>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default GameLayout;


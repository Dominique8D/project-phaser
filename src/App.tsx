import { useRef, useState } from 'react';
import { IRefPhaserGame, PhaserGame } from './game/PhaserGame';
import { MainMenu } from './game/scenes/MainMenu';
import { AppBar, Stack, Toolbar, Typography } from '@mui/material';
import ThemeToggleButton from './theme/theme-toggle-button';
import useLangTranslation from './custom-hooks/use-lang-translation';
import './i18n';
import LangSelector from './components/lang-selector';
import GameSelector, { TEST_GAME } from './components/game-selector';
import { EndlessGame } from './endless_game/EndlessGame';
import TestGameControls from './components/test_game/test-game-controls';

const APP_HEADER_HEIGHT = 64;
const EXTRA_STACK_DIR = 'column';
const EXTRA_STACK_SPACING = 1;
const EXTRA_STACK_SX = {
  width: { xs: '100%', md: 200 },
  flexGrow: { xs: 1, md: 0 },
  padding: 1,
  backgroundColor: '#d3d3d3ff',
  boxSizing: 'border-box',
};
const EXTRA_CHILD_EXAMPLE_SX = {
  flex: 1,
  borderRadius: 1,
  padding: 1,
  background: 'linear-gradient(135deg,rgba(0, 81, 255, 1), #00c3ffff)',
};

function App() {
  const { t } = useLangTranslation('common');
  const [canMoveSprite, setCanMoveSprite] = useState(true);
  const phaserRef = useRef<IRefPhaserGame | null>(null);
  const [spritePosition, setSpritePosition] = useState({ x: 0, y: 0 });
  const [currentGame, setCurrentGame] = useState<string | null>(null);
  const isInTestGame = currentGame === TEST_GAME;

  const changeScene = () => {
    if (phaserRef.current) {
      const scene = phaserRef.current.scene as MainMenu;
      if (scene) scene.changeScene();
    }
  };

  const moveSprite = () => {
    if (phaserRef.current) {
      const scene = phaserRef.current.scene as MainMenu;
      if (scene && scene.scene.key === 'MainMenu') {
        scene.moveLogo(({ x, y }) => setSpritePosition({ x, y }));
      }
    }
  };

  const addSprite = () => {
    if (phaserRef.current) {
      const scene = phaserRef.current.scene;
      if (scene) {
        const x = Phaser.Math.Between(64, scene.scale.width - 64);
        const y = Phaser.Math.Between(64, scene.scale.height - 64);
        const star = scene.add.sprite(x, y, 'star');
        scene.add.tween({
          targets: star,
          duration: 500 + Math.random() * 1000,
          alpha: 0,
          yoyo: true,
          repeat: -1,
        });
      }
    }
  };

  const currentScene = (scene: Phaser.Scene) => {
    setCanMoveSprite(scene.scene.key !== 'MainMenu');
  };

  const gameTranslations = {
    title: t('title'),
  };

  return (
    <>
      <AppBar position='sticky' color='primary'>
        <Toolbar>
          <Stack direction='row' justifyContent='space-between' alignItems='center' width='100%'>
            <h1>{t('title')}</h1>
            <Stack direction='row' spacing={2}>
              <ThemeToggleButton />
              <LangSelector disabled={!!currentGame} />
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>

      <Stack p={2} gap={2} sx={{ height: `calc(100vh - ${APP_HEADER_HEIGHT}px)` }}>
        {currentGame === null ? (
          <GameSelector currentGame={currentGame} setCurrentGame={setCurrentGame} />
        ) : (
          <>
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              sx={{ flexGrow: 1, width: '100%', overflow: 'hidden' }}
            >
              <Stack direction={EXTRA_STACK_DIR} spacing={EXTRA_STACK_SPACING} sx={EXTRA_STACK_SX}>
                <Stack sx={EXTRA_CHILD_EXAMPLE_SX} />
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
                {isInTestGame ? (
                  <PhaserGame
                    ref={phaserRef}
                    currentActiveScene={currentScene}
                    translations={gameTranslations}
                  />
                ) : (
                  <EndlessGame
                    ref={phaserRef}
                    currentActiveScene={currentScene}
                    translations={gameTranslations}
                  />
                )}
              </Stack>

              <Stack direction={EXTRA_STACK_DIR} spacing={EXTRA_STACK_SPACING} sx={EXTRA_STACK_SX}>
                <Stack sx={EXTRA_CHILD_EXAMPLE_SX} />
              </Stack>
            </Stack>

            {isInTestGame && (
              <Stack direction='row' justifyContent='center' alignItems='center'>
                <TestGameControls
                  changeScene={changeScene}
                  canMoveSprite={canMoveSprite}
                  moveSprite={moveSprite}
                  addSprite={addSprite}
                />
                <Typography>{`{\n  x: ${spritePosition.x}\n  y: ${spritePosition.y}\n}`}</Typography>
              </Stack>
            )}
          </>
        )}
      </Stack>
    </>
  );
}

export default App;

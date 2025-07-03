import { useRef, useState } from 'react';
import { IRefPhaserGame, PhaserGame } from './game/PhaserGame';
import { MainMenu } from './game/scenes/MainMenu';
import { Stack } from '@mui/material';
import ThemeToggleButton from './theme/theme-toggle-button';
import useLangTranslation from './custom-hooks/use-lang-translation';
import './i18n';
import LangSelector from './components/lang-selector';
import GameSelector, { TEST_GAME } from './components/game-selector';
import { EndlessGame } from './endless_game/PhaserGame';
import TestGameControls from './components/test_game/test-game-controls';

function App() {
  const { t } = useLangTranslation('common');
  // The sprite can only be moved in the MainMenu Scene
  const [canMoveSprite, setCanMoveSprite] = useState(true);

  //  References to the PhaserGame component (game and scene are exposed)
  const phaserRef = useRef<IRefPhaserGame | null>(null);
  const [spritePosition, setSpritePosition] = useState({ x: 0, y: 0 });
  const [currentGame, setCurrentGame] = useState<string | null>(null);

  const isInTestGame = currentGame === TEST_GAME;

  const changeScene = () => {
    if (phaserRef.current) {
      const scene = phaserRef.current.scene as MainMenu;

      if (scene) {
        scene.changeScene();
      }
    }
  };

  const moveSprite = () => {
    if (phaserRef.current) {
      const scene = phaserRef.current.scene as MainMenu;

      if (scene && scene.scene.key === 'MainMenu') {
        // Get the update logo position
        scene.moveLogo(({ x, y }) => {
          setSpritePosition({ x, y });
        });
      }
    }
  };

  const addSprite = () => {
    if (phaserRef.current) {
      const scene = phaserRef.current.scene;

      if (scene) {
        // Add more stars
        const x = Phaser.Math.Between(64, scene.scale.width - 64);
        const y = Phaser.Math.Between(64, scene.scale.height - 64);

        //  `add.sprite` is a Phaser GameObjectFactory method and it returns a Sprite Game Object instance
        const star = scene.add.sprite(x, y, 'star');

        //  ... which you can then act upon. Here we create a Phaser Tween to fade the star sprite in and out.
        //  You could, of course, do this from within the Phaser Scene code, but this is just an example
        //  showing that Phaser objects and systems can be acted upon from outside of Phaser itself.
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

  // Event emitted from the PhaserGame component
  const currentScene = (scene: Phaser.Scene) => {
    setCanMoveSprite(scene.scene.key !== 'MainMenu');
  };

  const gameTranslations = {
    title: t('title'),
  };

  return (
    <Stack
      direction='row'
      gap={2}
      sx={{
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {currentGame === null ? (
        <GameSelector currentGame={currentGame} setCurrentGame={setCurrentGame} />
      ) : (
        <>
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
        </>
      )}
      <Stack>
        <h1> {t('title')} </h1>
        <Stack direction='row'>
          <ThemeToggleButton />
          <LangSelector />
        </Stack>
        {isInTestGame && (
          <TestGameControls
            changeScene={changeScene}
            canMoveSprite={canMoveSprite}
            moveSprite={moveSprite}
            addSprite={addSprite}
          />
        )}
        {isInTestGame && (
          <Stack>
            <pre>{`{\n  x: ${spritePosition.x}\n  y: ${spritePosition.y}\n}`}</pre>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}

export default App;

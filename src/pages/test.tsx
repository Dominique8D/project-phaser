import { useRef, useState } from 'react';
import useLangTranslation from '../custom-hooks/use-lang-translation';
import { TestGame } from '../test_game/TestGame';
import { MainMenu } from '../test_game/scenes/MainMenu';
import TestGameControls from '../components/test_game/test-game-controls';
import { Typography } from '@mui/material';
import GameLayout from '../components/game-layout';
import { IRefPhaserGame } from '../game-consts/game-interfaces';

const TestGamePage = () => {
  const { t } = useLangTranslation('testGame');
  const [canMoveSprite, setCanMoveSprite] = useState(true);
  const [spritePosition, setSpritePosition] = useState({ x: 0, y: 0 });
  const phaserRef = useRef<IRefPhaserGame | null>(null);

  const changeScene = () => {
    const scene = phaserRef.current?.scene as MainMenu;
    scene?.changeScene();
  };

  const moveSprite = () => {
    const scene = phaserRef.current?.scene as MainMenu;
    if (scene?.scene.key === 'MainMenu') {
      scene.moveLogo(({ x, y }) => setSpritePosition({ x, y }));
    }
  };

  const addSprite = () => {
    const scene = phaserRef.current?.scene;
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
  };

  const currentScene = (scene: Phaser.Scene) => {
    setCanMoveSprite(scene.scene.key !== 'MainMenu');
  };

  const gameTranslations = {
    title: t('title'),
  };

  return (
    <GameLayout
      title={gameTranslations.title}
      startContent={
        <>
          <TestGameControls
            changeScene={changeScene}
            canMoveSprite={canMoveSprite}
            moveSprite={moveSprite}
            addSprite={addSprite}
          />
          <Typography>{`{\n  x: ${spritePosition.x}\n  y: ${spritePosition.y}\n}`}</Typography>
        </>
      }
    >
      <TestGame ref={phaserRef} currentActiveScene={currentScene} translations={gameTranslations} />
    </GameLayout>
  );
};

export default TestGamePage;


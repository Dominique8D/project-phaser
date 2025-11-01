import { useEffect, useRef, useState } from 'react';
import useLangTranslation from '../custom-hooks/use-lang-translation';
import { EndlessGame } from '../endless_game/EndlessGame';
import GameLayout from '../components/game-layout';
import { IRefPhaserGame } from '../game-consts/game-interfaces';
import EndlessStartContent from './endless-components.tsx/endless-start-content';
import { EventBus } from '../endless_game/EventBus';
import { EventTypes } from '../endless_game/EventTypes';

const EndlessGamePage = () => {
  const { t } = useLangTranslation('endlessGame');
  const phaserRef = useRef<IRefPhaserGame | null>(null);
  const [activeScene, setActiveScene] = useState<Phaser.Scene | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const currentScene = (scene: Phaser.Scene) => {
    setActiveScene(scene);
  };

  const gameTranslations = {
    title: t('title'),
  };

  // Handle pause
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (target.tagName === 'CANVAS') {
        if (isPaused) {
          EventBus.emit(EventTypes.GAME_RESUME);
          setIsPaused(false);
        }
      } else {
        if (!isPaused) {
          EventBus.emit(EventTypes.GAME_PAUSE);
          setIsPaused(true);
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [isPaused]);

  return (
    <GameLayout
      title={gameTranslations.title}
      startContent={<EndlessStartContent scene={activeScene} />}
    >
      <EndlessGame
        ref={phaserRef}
        currentActiveScene={currentScene}
        translations={gameTranslations}
      />
    </GameLayout>
  );
};

export default EndlessGamePage;


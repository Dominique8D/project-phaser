import { useRef, useState } from 'react';
import useLangTranslation from '../custom-hooks/use-lang-translation';
import { EndlessGame } from '../endless_game/EndlessGame';
import GameLayout from '../components/game-layout';
import { IRefPhaserGame } from '../game-consts/game-interfaces';
import EndlessStartContent from './endless-components.tsx/endless-start-content';

const EndlessGamePage = () => {
  const { t } = useLangTranslation('endlessGame');
  const phaserRef = useRef<IRefPhaserGame | null>(null);
  const [activeScene, setActiveScene] = useState<Phaser.Scene | null>(null);

  const currentScene = (scene: Phaser.Scene) => {
    setActiveScene(scene);
  };

  const gameTranslations = {
    title: t('title'),
  };

  return (
    <GameLayout title={gameTranslations.title} startContent={<EndlessStartContent scene={activeScene} />}>
      <EndlessGame
        ref={phaserRef}
        currentActiveScene={currentScene}
        translations={gameTranslations}
      />
    </GameLayout>
  );
};

export default EndlessGamePage;


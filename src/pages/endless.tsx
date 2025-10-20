import { useRef } from 'react';
import useLangTranslation from '../custom-hooks/use-lang-translation';
import { IRefPhaserGame } from '../game/TestGame';
import { EndlessGame } from '../endless_game/EndlessGame';
import GameLayout from '../components/game-layout';

const EndlessGamePage = () => {
  const { t } = useLangTranslation('common');
  const phaserRef = useRef<IRefPhaserGame | null>(null);

  const currentScene = (scene: Phaser.Scene) => {
    console.log(scene);
  };

  const gameTranslations = {
    title: t('title'),
  };

  return (
    <GameLayout title={gameTranslations.title}>
      <EndlessGame
        ref={phaserRef}
        currentActiveScene={currentScene}
        translations={gameTranslations}
      />
    </GameLayout>
  );
};

export default EndlessGamePage;


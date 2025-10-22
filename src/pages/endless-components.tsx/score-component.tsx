import { useEffect, useState, useCallback } from 'react';
import { Stack, Typography } from '@mui/material';
import useLangTranslation from '../../custom-hooks/use-lang-translation';
import { EventBus } from '../../endless_game/EventBus';
import { EventTypes } from '../../endless_game/EventTypes';
import { REG_HIGHSCORE } from '../../endless_game/utils/registy-keys';
import { MAIN_GAME_ID } from '../../game-consts/game-consts';

type EndlessStartContentProps = {
  scene: Phaser.Scene | null;
};

const EndlessScoreUI = ({ scene }: EndlessStartContentProps) => {
  const { t } = useLangTranslation('endlessGame');
  const [hiScore, setHiScore] = useState<number>(0);
  const [currentScore, setCurrentScore] = useState<number>(0);

  const isMainGame = scene?.scene.key === MAIN_GAME_ID;

  const handleScoreUpdate = useCallback((score: number) => {
    setCurrentScore(score);
  }, []);

  const handleHighscoreUpdate = useCallback((score: number) => {
    setHiScore(score);
  }, []);

  useEffect(() => {
    if (isMainGame && scene?.registry) {
      const savedHigh = scene.registry.get(REG_HIGHSCORE) ?? 0;
      setHiScore(savedHigh);
    }

    EventBus.on(EventTypes.SCORE_UPDATED, handleScoreUpdate);
    EventBus.on(EventTypes.HIGHSCORE_UPDATED, handleHighscoreUpdate);

    return () => {
      EventBus.off(EventTypes.SCORE_UPDATED, handleScoreUpdate);
      EventBus.off(EventTypes.HIGHSCORE_UPDATED, handleHighscoreUpdate);
    };
  }, [isMainGame, scene, handleScoreUpdate, handleHighscoreUpdate]);

  return (
    <Stack>
      <Typography>{`${t('hiScore')} ${hiScore}`}</Typography>
      <Typography>{`${t('currentScore')} ${currentScore}`}</Typography>
    </Stack>
  );
};

export default EndlessScoreUI;


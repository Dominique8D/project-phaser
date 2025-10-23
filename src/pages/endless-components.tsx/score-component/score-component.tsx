import { useEffect, useState, useCallback } from 'react';
import { Stack } from '@mui/material';
import useLangTranslation from '../../../custom-hooks/use-lang-translation';
import { EventBus } from '../../../endless_game/EventBus';
import { EventTypes } from '../../../endless_game/EventTypes';
import { REG_HIGHSCORE } from '../../../endless_game/utils/registy-keys';
import { MAIN_GAME_ID } from '../../../game-consts/game-consts';
import ScoreRow from './score-row';

const ANIM_TIME_OUT = 300;

const SCORE_COMP_SX = {
  gap: 2,
  padding: 1,
  alignItems: 'stretch',
  justifyContent: 'start',
};

type EndlessScoreUIProps = {
  scene: Phaser.Scene | null;
};

const ScoreComponent = ({ scene }: EndlessScoreUIProps) => {
  const { t } = useLangTranslation('endlessGame');

  const [hiScore, setHiScore] = useState<number>(0);
  const [currentScore, setCurrentScore] = useState<number>(0);
  const [canHiScoreAnimate, setCanHiScoreAnimate] = useState(false);
  const [canScoreAnimate, setCanScoreAnimate] = useState(false);

  const isMainGame = scene?.scene.key === MAIN_GAME_ID;

  useEffect(() => {
    if (isMainGame && scene?.registry) {
      const savedHigh = scene.registry.get(REG_HIGHSCORE) ?? 0;
      setHiScore(savedHigh);
    }
  }, [isMainGame, scene]);

  const createScoreHandler = (
    setScore: React.Dispatch<React.SetStateAction<number>>,
    setAnimate: React.Dispatch<React.SetStateAction<boolean>>,
  ) =>
    useCallback(
      (score: number) => {
        setScore((prev) => {
          if (score > prev) {
            setAnimate(true);
            setTimeout(() => setAnimate(false), ANIM_TIME_OUT);
          }
          return score;
        });
      },
      [setScore, setAnimate],
    );

  const handleScoreUpdate = createScoreHandler(setCurrentScore, setCanScoreAnimate);
  const handleHighscoreUpdate = createScoreHandler(setHiScore, setCanHiScoreAnimate);

  useEffect(() => {
    EventBus.on(EventTypes.SCORE_UPDATED, handleScoreUpdate);
    EventBus.on(EventTypes.HIGHSCORE_UPDATED, handleHighscoreUpdate);

    return () => {
      EventBus.off(EventTypes.SCORE_UPDATED, handleScoreUpdate);
      EventBus.off(EventTypes.HIGHSCORE_UPDATED, handleHighscoreUpdate);
    };
  }, [handleScoreUpdate, handleHighscoreUpdate]);

  return (
    <Stack sx={SCORE_COMP_SX} direction={{ xs: 'row', md: 'column' }}>
      <ScoreRow label={t('hiScore')} value={hiScore} shouldAnimate={canHiScoreAnimate} />
      <ScoreRow label={t('currentScore')} value={currentScore} shouldAnimate={canScoreAnimate} />
    </Stack>
  );
};

export default ScoreComponent;


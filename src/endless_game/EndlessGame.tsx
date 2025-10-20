import { forwardRef } from 'react';
import { Stack } from '@mui/material';
import { IGameProps, IRefPhaserGame } from '../game-consts/game-interfaces';
import StartGame from './main';
import { EventBus } from './EventBus';
import { EventTypes } from './EventTypes';
import { usePhaserLifecycle } from '../custom-hooks/use-phaser-life-cycle';
import { GAME_CONTAINER_ID } from '../game-consts/game-consts';

export const EndlessGame = forwardRef<IRefPhaserGame, IGameProps>(function PhaserGame(
  { currentActiveScene, translations },
  ref,
) {
  usePhaserLifecycle({
    ref,
    currentActiveScene,
    translations,
    startGame: StartGame,
    eventBus: EventBus,
    eventTypes: EventTypes,
  });

  return <Stack id={GAME_CONTAINER_ID} />;
});

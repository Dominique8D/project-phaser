import { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import StartGame from './main';
import { EventBus } from './EventBus';
import { Stack } from '@mui/material';
import { EventTypes } from '../endless_game/EventTypes';
import { IGameProps, IRefPhaserGame } from '../game-consts/game-interfaces';

export const TestGame = forwardRef<IRefPhaserGame, IGameProps>(function PhaserGame(
  { currentActiveScene, translations },
  ref,
) {
  const game = useRef<Phaser.Game | null>(null!);

  useLayoutEffect(() => {
    if (game.current === null) {
      game.current = StartGame('game-container');

      if (typeof ref === 'function') {
        ref({ game: game.current, scene: null });
      } else if (ref) {
        ref.current = { game: game.current, scene: null };
      }
    }

    return () => {
      if (game.current) {
        game.current.destroy(true);
        if (game.current !== null) {
          game.current = null;
        }
      }
    };
  }, [ref]);

  useEffect(() => {
    EventBus.on('current-scene-ready', (scene_instance: Phaser.Scene) => {
      if (currentActiveScene && typeof currentActiveScene === 'function') {
        currentActiveScene(scene_instance);
      }

      if (typeof ref === 'function') {
        ref({ game: game.current, scene: scene_instance });
      } else if (ref) {
        ref.current = { game: game.current, scene: scene_instance };
      }
    });
    return () => {
      EventBus.removeListener('current-scene-ready');
    };
  }, [currentActiveScene, ref]);

  useEffect(() => {
    if (game.current) {
      EventBus.emit(EventTypes.UPDATE_TRANSLATIONS, translations);
    }
  }, [translations]);

  return <Stack id='game-container'></Stack>;
});

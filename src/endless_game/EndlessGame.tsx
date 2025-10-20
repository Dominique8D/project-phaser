import { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import StartGame from './main';
import { EventBus } from './EventBus';
import { Stack } from '@mui/material';
import { EventTypes } from './EventTypes';

export interface Translations {
  [key: string]: string;
}

export interface IRefEndlessGame {
  game: Phaser.Game | null;
  scene: Phaser.Scene | null;
}

interface IProps {
  currentActiveScene?: (scene_instance: Phaser.Scene) => void;
  translations: Translations;
}

export const EndlessGame = forwardRef<IRefEndlessGame, IProps>(function PhaserGame(
  { currentActiveScene, translations },
  ref,
) {
  const game = useRef<Phaser.Game | null>(null);

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
        game.current = null;
      }
    };
  }, [ref]);

  useEffect(() => {
    EventBus.on(EventTypes.SCENE_READY, (scene_instance: Phaser.Scene) => {
      if (currentActiveScene) {
        currentActiveScene(scene_instance);
      }

      if (typeof ref === 'function') {
        ref({ game: game.current, scene: scene_instance });
      } else if (ref) {
        ref.current = { game: game.current, scene: scene_instance };
      }

      // Only send when scene is ready
      EventBus.emit(EventTypes.UPDATE_TRANSLATIONS, translations);
    });

    return () => {
      EventBus.removeListener(EventTypes.SCENE_READY);
    };
  }, [currentActiveScene, ref, translations]);

  return <Stack id='game-container' />;
});

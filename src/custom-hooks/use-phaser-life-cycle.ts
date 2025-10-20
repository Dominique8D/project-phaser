import { useEffect, useLayoutEffect, useRef } from 'react';
import { GAME_CONTAINER_ID } from '../game-consts/game-consts';
import { IRefPhaserGame } from '../game-consts/game-interfaces';

type EventBusType = {
  on: (event: string, callback: (...args: any[]) => void) => void;
  emit: (event: string, payload?: any) => void;
  removeListener: (event: string, callback?: (...args: any[]) => void) => void;
};

type EventTypesMap = {
  SCENE_READY: string;
  UPDATE_TRANSLATIONS: string;
};

type UsePhaserLifecycleParams = {
  ref: React.ForwardedRef<IRefPhaserGame>;
  currentActiveScene?: (scene: Phaser.Scene) => void;
  translations?: Record<string, string>;
  startGame: (containerId: string) => Phaser.Game;
  eventBus: EventBusType;
  eventTypes: EventTypesMap;
};

export const usePhaserLifecycle = ({
  ref,
  currentActiveScene,
  translations,
  startGame,
  eventBus,
  eventTypes,
}: UsePhaserLifecycleParams) => {
  const game = useRef<Phaser.Game | null>(null);

  useLayoutEffect(() => {
    if (!game.current) {
      game.current = startGame(GAME_CONTAINER_ID);
      const refValue = { game: game.current, scene: null };
      if (typeof ref === 'function') ref(refValue);
      else if (ref) ref.current = refValue;
    }

    return () => {
      game.current?.destroy(true);
      game.current = null;
    };
  }, [ref, startGame]);

  useEffect(() => {
    const handleSceneReady = (scene: Phaser.Scene) => {
      currentActiveScene?.(scene);
      const refValue = { game: game.current, scene };
      if (typeof ref === 'function') ref(refValue);
      else if (ref) ref.current = refValue;

      eventBus.emit(eventTypes.UPDATE_TRANSLATIONS, translations);
    };

    eventBus.on(eventTypes.SCENE_READY, handleSceneReady);
    return () => {
      eventBus.removeListener(eventTypes.SCENE_READY, handleSceneReady);
    };
  }, [currentActiveScene, ref, translations, eventBus, eventTypes]);
};


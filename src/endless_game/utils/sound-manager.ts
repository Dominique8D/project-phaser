import { EventTypes } from '../EventTypes';
import { EventBus } from '../EventBus';

type SoundConfig = {
  key: string;
  repeatOnce?: boolean;
};

export class SoundManager {
  private scene: Phaser.Scene;
  private soundMap: Record<string, SoundConfig>;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;

    this.soundMap = {
      [EventTypes.SELECT_MENU_ITEM]: { key: 'select' },
      [EventTypes.PLAYER_LANDED]: { key: 'landing' },
      [EventTypes.PLAYER_JUMP]: { key: 'jump' },
      [EventTypes.PLAYER_PLUMMET]: { key: 'wind', repeatOnce: true },
      [EventTypes.SCORE_NO_CHANGE]: { key: 'item' },
      [EventTypes.SCORE_INCREASE]: { key: 'item-2' },
      [EventTypes.SCORE_DECREASE]: { key: 'hit' },
      [EventTypes.ENEMY_SPAWN]: { key: 'enemy', repeatOnce: true },
      [EventTypes.ENEMY_ENTER]: { key: 'enemy-2' },
    };

    this.registerListeners();
    this.registerCleanup();
  }

  private registerListeners(): void {
    for (const eventType of Object.keys(this.soundMap)) {
      EventBus.on(eventType, () => this.playSound(eventType));
    }
  }

  private registerCleanup(): void {
    this.scene.events.once('shutdown', () => {
      for (const eventType of Object.keys(this.soundMap)) {
        EventBus.off(eventType);
      }
    });
  }

  private playSound(eventType: string): void {
    const config = this.soundMap[eventType];
    if (!config) return;

    const sound = this.scene.sound.add(config.key);
    sound.play();

    if (config.repeatOnce) {
      sound.once('complete', () => {
        sound.play();
      });
    }
  }
}


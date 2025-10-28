import { EventTypes } from '../EventTypes';
import { EventBus } from '../EventBus';

export class SoundManager {
  private scene: Phaser.Scene;
  private soundMap: Record<string, string>;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;

    this.soundMap = {
      [EventTypes.SELECT_MENU_ITEM]: 'select',
      [EventTypes.PLAYER_LANDED]: 'landing',
      [EventTypes.PLAYER_JUMP]: 'jump',
    };

    this.registerListeners();
    this.registerCleanup();
  }

  private registerListeners() {
    Object.keys(this.soundMap).forEach((eventType) => {
      EventBus.on(eventType, () => this.playSound(eventType));
    });
  }

  private registerCleanup() {
    this.scene.events.once('shutdown', () => {
      Object.keys(this.soundMap).forEach((eventType) => {
        EventBus.off(eventType);
      });
    });
  }

  private playSound(eventType: string) {
    const soundKey = this.soundMap[eventType];
    if (soundKey) {
      this.scene.sound.play(soundKey);
    }
  }
}


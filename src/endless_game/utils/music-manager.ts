import { EventTypes } from '../EventTypes';
import { EventBus } from '../EventBus';
import { getMusicVolume } from '../../state/audio-state';

type MusicConfig = {
  key: string;
  loop?: boolean;
};

export class MusicManager {
  private scene: Phaser.Scene;
  private musicMap: Record<string, MusicConfig>;
  private currentMusic?: Phaser.Sound.BaseSound;
  private lastPlayedEvent?: string;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;

    this.musicMap = {
      // TODO: ALL TEMP
      [EventTypes.PLAYER_JUMP]: { key: 'TEMP_BGM_POL-TR', loop: true },
    };

    this.registerListeners();
    this.registerCleanup();
  }

  private registerListeners(): void {
    for (const eventType of Object.keys(this.musicMap)) {
      EventBus.on(eventType, () => this.playMusic(eventType));
    }

    EventBus.on(EventTypes.GAME_PAUSE, () => this.pauseMusic());
    EventBus.on(EventTypes.GAME_RESUME, () => this.resumeMusic());
  }

  private registerCleanup(): void {
    this.scene.events.once('shutdown', () => {
      for (const eventType of Object.keys(this.musicMap)) {
        EventBus.off(eventType);
      }

      EventBus.off(EventTypes.GAME_PAUSE);
      EventBus.off(EventTypes.GAME_RESUME);

      this.stopCurrentMusic();
    });
  }

  private playMusic(eventType: string): void {
    const config = this.musicMap[eventType];
    if (!config) return;

    this.stopCurrentMusic();

    this.currentMusic = this.scene.sound.add(config.key, {
      volume: getMusicVolume(),
      loop: config.loop ?? false,
    });

    this.currentMusic.play();
    this.lastPlayedEvent = eventType;
  }

  private stopCurrentMusic(): void {
    if (this.currentMusic && (this.currentMusic.isPlaying || this.currentMusic.isPaused)) {
      this.currentMusic.stop();
      this.currentMusic.destroy();
      this.currentMusic = undefined;
    }
  }

  private pauseMusic(): void {
    this.stopCurrentMusic();
  }

  private resumeMusic(): void {
    if (this.lastPlayedEvent) {
      this.playMusic(this.lastPlayedEvent);
    }
  }
}


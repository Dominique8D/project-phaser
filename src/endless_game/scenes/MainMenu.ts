import { GameObjects, Scene } from 'phaser';
import { EventBus } from '../EventBus';
import { EventTypes } from '../EventTypes';
import { Translations } from '../../game-consts/game-interfaces';
import { MAIN_GAME_ID } from '../../game-consts/game-consts';
import { ENDLESS_FONT_FAMILIES } from '../../theme/theme-consts';
import { SoundManager } from '../utils/sound-manager';
import { MusicManager } from '../utils/music-manager';
import { setupAudioManagers } from '../utils/game-utils';
import { GAME_COLORS } from '../../theme/game-colors';

export class MainMenu extends Scene {
  title!: GameObjects.Text;
  soundManager!: SoundManager;
  musicManager!: MusicManager;

  constructor() {
    super('MainMenu');
  }

  create() {
    ({ soundManager: this.soundManager, musicManager: this.musicManager } =
      setupAudioManagers(this));

    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    this.title = this.add
      .text(centerX, centerY - 120, '', {
        fontFamily: ENDLESS_FONT_FAMILIES.title,
        fontSize: 56,
        color: GAME_COLORS.text,
        stroke: GAME_COLORS.menuOutline,
        strokeThickness: 4,
        align: 'center',
      })
      .setOrigin(0.5)
      .setDepth(100)
      .setInteractive({ useHandCursor: true });

    this.title.on('pointerdown', () => {
      this.scene.start(MAIN_GAME_ID);
      EventBus.emit(EventTypes.SELECT_MENU_ITEM);
    });

    EventBus.on(EventTypes.UPDATE_TRANSLATIONS, (translations: Translations) => {
      if (translations.title) {
        this.title.setText(translations.title);
      }
    });

    this.events.once('shutdown', () => {
      EventBus.off(EventTypes.UPDATE_TRANSLATIONS);
    });

    EventBus.emit(EventTypes.SCENE_READY, this);
  }
}

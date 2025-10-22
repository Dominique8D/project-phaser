import { GameObjects, Scene } from 'phaser';
import { EventBus } from '../EventBus';
import { EventTypes } from '../EventTypes';
import { Translations } from '../../game-consts/game-interfaces';
import { MAIN_GAME_ID } from '../../game-consts/game-consts';

export class MainMenu extends Scene {
  background!: GameObjects.Image;
  title!: GameObjects.Text;
  startButton!: GameObjects.Image;
  logos: GameObjects.Image[] = [];

  constructor() {
    super('MainMenu');
  }

  create() {
    this.background = this.add.image(512, 384, 'background');

    const spriteKeys = [
      'tst_fall',
      'tst_idle',
      'tst_jmp',
      'tst_move',
      'tst_plummet',
      'tst_powerup',
      'tst_step',
    ];

    spriteKeys.forEach((key, index) => {
      const sprite = this.add.image(512 + index * 10, 600, key).setDepth(100);
      this.logos.push(sprite);
    });

    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    this.startButton = this.add
      .image(centerX, centerY, 'tst_powerup')
      .setDepth(100)
      .setScale(10)
      .setInteractive();

    this.startButton.on('pointerdown', () => {
      this.scene.start(MAIN_GAME_ID);
    });

    this.title = this.add
      .text(512, 460, 'Main Menu', {
        fontFamily: 'Arial Black',
        fontSize: 38,
        color: '#000000',
        stroke: '#ffffff',
        strokeThickness: 8,
        align: 'center',
      })
      .setOrigin(0.5)
      .setDepth(100);

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

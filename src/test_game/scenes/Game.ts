import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { EventTypes } from '../EventTypes';
import { Translations } from '../../game-consts/game-interfaces';
import { GAME_COLORS } from '../../theme/game-colors';

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  gameText: Phaser.GameObjects.Text;

  constructor() {
    super('Game');
  }

  create() {
    this.camera = this.cameras.main;
    this.camera.setBackgroundColor(GAME_COLORS.backgroundTestScene);

    this.background = this.add.image(512, 384, 'background');
    this.background.setAlpha(0.5);

    this.gameText = this.add
      .text(512, 384, '', {
        fontFamily: 'Arial Black',
        fontSize: 38,
        color: GAME_COLORS.text,
        stroke: GAME_COLORS.textOutline,
        strokeThickness: 8,
        align: 'center',
      })
      .setOrigin(0.5)
      .setDepth(100);

    EventBus.on(EventTypes.UPDATE_TRANSLATIONS, (translations: Translations) => {
      if (translations.message) this.gameText.setText(translations.message);
    });
    this.events.once('shutdown', () => EventBus.off(EventTypes.UPDATE_TRANSLATIONS));

    EventBus.emit(EventTypes.SCENE_READY, this);
  }

  changeScene() {
    this.scene.start('GameOver');
  }
}

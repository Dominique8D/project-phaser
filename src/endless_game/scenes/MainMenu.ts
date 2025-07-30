import { GameObjects, Scene } from 'phaser';
import { EventBus } from '../EventBus';
import { Translations } from '../PhaserGame';

export class MainMenu extends Scene {
  background: GameObjects.Image;
  logo: GameObjects.Image;
  title: GameObjects.Text;
  startButton: GameObjects.Image;

  constructor() {
    super('MainMenu');
  }

  create() {
    this.background = this.add.image(512, 384, 'background');
    this.logo = this.add.image(512, 300, 'logo').setDepth(100);

    this.logo = this.add.image(512, 600, 'tst_fall').setDepth(100);
    this.logo = this.add.image(522, 600, 'tst_idle').setDepth(100);
    this.logo = this.add.image(532, 600, 'tst_jmp').setDepth(100);
    this.logo = this.add.image(542, 600, 'tst_move').setDepth(100);
    this.logo = this.add.image(552, 600, 'tst_plummet').setDepth(100);
    this.logo = this.add.image(562, 600, 'tst_powerup').setDepth(100);
    this.logo = this.add.image(572, 600, 'tst_step').setDepth(100);

    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    const startButton = this.add
      .image(centerX, centerY, 'tst_powerup')
      .setDepth(100)
      .setScale(10)
      .setInteractive();

    startButton.on('pointerdown', () => {
      this.scene.start('MainGame');
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

    EventBus.on('updateTranslations', (translations: Translations) => {
      this.title.setText(translations.title);
    });

    EventBus.emit('current-scene-ready', this);
  }

  shutdown() {
    EventBus.off('updateTranslations');
  }
}

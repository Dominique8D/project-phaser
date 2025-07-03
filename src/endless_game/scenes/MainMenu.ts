import { GameObjects, Scene } from 'phaser';
import { EventBus } from '../EventBus';
import { Translations } from '../PhaserGame';

export class MainMenu extends Scene {
  background: GameObjects.Image;
  logo: GameObjects.Image;
  title: GameObjects.Text;
  logoTween: Phaser.Tweens.Tween | null;

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

  changeScene() {
    if (this.logoTween) {
      this.logoTween.stop();
      this.logoTween = null;
    }
    this.scene.start('Game');
  }

  moveLogo(vueCallback: ({ x, y }: { x: number; y: number }) => void) {
    if (this.logoTween) {
      if (this.logoTween.isPlaying()) {
        this.logoTween.pause();
      } else {
        this.logoTween.play();
      }
    } else {
      this.logoTween = this.tweens.add({
        targets: this.logo,
        x: { value: 750, duration: 3000, ease: 'Back.easeInOut' },
        y: { value: 80, duration: 1500, ease: 'Sine.easeOut' },
        yoyo: true,
        repeat: -1,
        onUpdate: () => {
          if (vueCallback) {
            vueCallback({
              x: Math.floor(this.logo.x),
              y: Math.floor(this.logo.y),
            });
          }
        },
      });
    }
  }

  shutdown() {
    EventBus.off('updateTranslations');
  }
}

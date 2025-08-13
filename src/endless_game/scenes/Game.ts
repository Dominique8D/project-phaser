import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { Player } from '../objects/player';
import { JumpOrb } from '../objects/jump-orb';

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  gameText: Phaser.GameObjects.Text;
  player: Player;
  pointer: Phaser.Input.Pointer;

  constructor() {
    super('MainGame');
  }

  preload() {
    this.load.image('tst_idle', 'assets/tst_idle.png');
  }

  create() {
    this.camera = this.cameras.main;
    this.camera.setBackgroundColor(0x00ff00);

    this.background = this.add.image(512, 384, 'background');
    this.background.setAlpha(0.5);

    this.physics.world.setBounds(0, 0, 1024, 768);

    const scaleWidth = this.scale.width;
    const scaleHeight = this.scale.height;

    this.player = new Player(this, scaleWidth / 2, scaleHeight / 1, 'tst_idle');
    this.player.setScale(5);

    new JumpOrb(this, scaleWidth / 2, 550, 'tst_powerup', this.player).setScale(5);
    new JumpOrb(this, scaleWidth / 1.5, 350, 'tst_powerup', this.player).setScale(5);
    new JumpOrb(this, scaleWidth / 2.5, 150, 'tst_powerup', this.player).setScale(5);

    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      this.pointer = pointer;
    });

    EventBus.emit('current-scene-ready', this);
  }

  update() {
    this.player.update(this.pointer);
  }
}

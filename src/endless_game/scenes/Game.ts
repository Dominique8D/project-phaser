import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { Player } from '../objects/player';
import { JumpOrb } from '../objects/jump-orb';

const WORLD_HEIGHT = 1000;

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  player: Player;
  pointer: Phaser.Input.Pointer;

  constructor() {
    super('MainGame');
  }

  preload() {
    this.load.image('tst_idle', 'assets/tst_idle.png');
    this.load.image('tst_powerup', 'assets/tst_powerup.png');
  }

  create() {
    const screenWidth = this.scale.width;
    const screenHeight = this.scale.height;

    const worldWidth = screenWidth;
    const worldHeight = WORLD_HEIGHT;

    this.physics.world.setBounds(0, 0, worldWidth, worldHeight);

    this.camera = this.cameras.main;
    this.camera.setBounds(0, 0, worldWidth, worldHeight);
    // Start camera at bottom
    this.camera.scrollY = worldHeight - screenHeight;

    // Debug lines for ground and top
    const groundY = worldHeight;

    const groundLine = this.add.graphics();
    groundLine.lineStyle(20, 0xff0000, 1);
    groundLine.beginPath();
    groundLine.moveTo(0, groundY);
    groundLine.lineTo(worldWidth, groundY);
    groundLine.strokePath();

    const topLine = this.add.graphics();
    topLine.lineStyle(20, 0x00ff00, 1);
    topLine.beginPath();
    topLine.moveTo(0, 0);
    topLine.lineTo(worldWidth, 0);
    topLine.strokePath();

    // Start player at bottom
    const playerStartX = screenWidth / 2;
    const playerStartY = groundY - 100;

    this.player = new Player(this, playerStartX, playerStartY, 'tst_idle');
    this.player.setScale(5);

    this.camera.startFollow(this.player, false, 0, 1);

    // Powerups test placement
    new JumpOrb(this, playerStartX, playerStartY - 200, 'tst_powerup', this.player).setScale(5);
    new JumpOrb(this, playerStartX + 150, playerStartY - 400, 'tst_powerup', this.player).setScale(
      5,
    );
    new JumpOrb(this, playerStartX - 150, playerStartY - 600, 'tst_powerup', this.player).setScale(
      5,
    );

    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      this.pointer = pointer;
    });

    EventBus.emit('current-scene-ready', this);
  }

  update(delta: number) {
    const camScrollSpeedPerSec = 120;
    this.player.update(this.pointer);
    this.camera.scrollY -= camScrollSpeedPerSec * (delta / 1000);
  }
}

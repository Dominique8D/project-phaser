import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { Player } from '../objects/player';
import { JumpOrb } from '../objects/jump-orb';

const WORLD_HEIGHT = 100000;

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

    // Add power ups
    this.generatePowerups();

    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      this.pointer = pointer;
    });

    EventBus.emit('current-scene-ready', this);
  }

  private generatePowerups(): void {
    const POWERUP_CONFIG = {
      spacingY: 150,
      marginX: 100,
      scale: 5,
      zones: 3,
      verticalOffset: 100,
    };

    const { spacingY, marginX, scale, zones, verticalOffset } = POWERUP_CONFIG;
    const screenWidth = this.scale.width;
    const zoneWidth = (screenWidth - 2 * marginX) / zones;
    const numPowerups = Math.floor((WORLD_HEIGHT - verticalOffset) / spacingY);

    for (let i = 0; i < numPowerups; i++) {
      const y = WORLD_HEIGHT - verticalOffset - i * spacingY;
      const zoneIndex = i % zones;
      const baseX = marginX + zoneIndex * zoneWidth;
      const x = Phaser.Math.Between(baseX, baseX + zoneWidth);

      new JumpOrb(this, x, y, 'tst_powerup', this.player).setScale(scale);
    }
  }

  update(delta: number) {
    const camScrollSpeedPerSec = 120;
    this.player.update(this.pointer);
    this.camera.scrollY -= camScrollSpeedPerSec * (delta / 1000);
  }
}

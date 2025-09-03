import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { Player } from '../objects/player';
import { generatePowerups, getGameWorldPamaters, setupDebugLines } from '../utils/game-utilts';

const WORLD_HEIGHT = 100000;

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  player: Player;
  pointer: Phaser.Input.Pointer;
  score: number;

  constructor() {
    super('MainGame');
  }

  preload() {
    this.load.image('jump-orb', 'assets/endless/jump-orb.png');
  }

  create() {
    this.scene.launch('HUDScene');
    this.setupScore();

    const { screenWidth, screenHeight } = getGameWorldPamaters(this);

    this.setupGameWorld(screenWidth);
    this.createPlayer(screenWidth);
    this.setupCamera(screenWidth, screenHeight);
    setupDebugLines(this, screenWidth);

    generatePowerups(this, this.player);

    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      this.pointer = pointer;
    });

    EventBus.emit('current-scene-ready', this);
  }

  update(delta: number) {
    this.updatePlayer();
    this.updateCamera(delta);
  }

  private setupGameWorld(screenWidth: number) {
    this.physics.world.setBounds(0, 0, screenWidth, WORLD_HEIGHT);
  }

  private setupScore() {
    this.score = 0;

    this.events.on('updateScore', (increase: number) => {
      this.score += increase;

      // HUDScene visueel bijwerken
      const hud = this.scene.get('HUDScene');
      hud.events.emit('updateScore', this.score);
    });
  }

  private setupCamera(screenWidth: number, screenHeight: number) {
    this.camera = this.cameras.main;
    this.camera.setBounds(0, 0, screenWidth, WORLD_HEIGHT);
    // Start camera at bottom
    this.camera.scrollY = screenWidth - screenHeight;
    // Follow player
    this.camera.startFollow(this.player, false, 0, 1);
  }

  private updateCamera(delta: number) {
    const camScrollSpeedPerSec = 120;
    this.camera.scrollY -= camScrollSpeedPerSec * (delta / 1000);
  }

  private createPlayer(screenWidth: number) {
    const playerStartX = screenWidth / 2;
    const playerStartY = WORLD_HEIGHT;

    this.player = new Player(this, playerStartX, playerStartY, 'tst_idle');
    this.player.setScale(5);
  }

  private updatePlayer() {
    this.player.update(this.pointer);
  }
}

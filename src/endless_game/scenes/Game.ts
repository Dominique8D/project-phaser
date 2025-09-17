import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { Player } from '../objects/player';
import { generatePowerups, getGameWorldPamaters, setupDebugLines } from '../utils/game-utilts';
import { EventTypes } from '../EventTypes';
import { WORLD_HEIGHT } from '../utils/game-consts';

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  player: Player;
  orbGroup: Phaser.GameObjects.Group;
  pointer: Phaser.Input.Pointer;
  score: number;

  constructor() {
    super('MainGame');
  }

  preload() {
    this.load.atlas(
      'objects',
      'assets/endless/obj-pack-texture.png',
      'assets/endless/obj-pack-texture.json',
    );
  }

  create() {
    this.scene.launch('HUDScene');
    this.setupScore();

    const { screenWidth, screenHeight } = getGameWorldPamaters(this);

    this.setupGameWorld(screenWidth);
    this.createPlayer(screenWidth);
    this.setupCamera(screenWidth, screenHeight);
    setupDebugLines(this, screenWidth);

    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      this.pointer = pointer;
    });

    EventBus.emit(EventTypes.SCENE_READY, this);

    this.orbGroup = this.add.group();
    EventBus.on(EventTypes.PLAYER_LANDED, () => {
      this.resetSession();
    });
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
    EventBus.on(EventTypes.SCORE_INCREASE, this.handleScoreIncrease, this);
    EventBus.on(EventTypes.SCORE_RESET, this.handleScoreReset, this);
  }

  private handleScoreIncrease(increase: number) {
    this.score += increase;
    EventBus.emit(EventTypes.SCORE_UPDATED, this.score);
  }

  private handleScoreReset() {
    this.score = 0;
    EventBus.emit(EventTypes.SCORE_UPDATED, this.score);
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

  private resetSession() {
    EventBus.emit(EventTypes.SCORE_RESET, this.score);
    generatePowerups(this, this.player, this.orbGroup);
  }

  shutdown() {
    EventBus.off(EventTypes.SCORE_INCREASE, this.handleScoreIncrease, this);
    EventBus.off(EventTypes.SCORE_RESET, this.handleScoreIncrease, this);
  }
}

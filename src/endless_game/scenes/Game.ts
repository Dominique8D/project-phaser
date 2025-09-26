import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { Player } from '../objects/player';
import { generatePowerups, getGameWorldPamaters, setupDebugLines } from '../utils/game-utilts';
import { EventTypes } from '../EventTypes';
import { CAM_SCROLL_SPEED, WORLD_HEIGHT, ZONE_CONFIG } from '../utils/game-consts';
import { PlayerHeightTracker } from '../objects/player-height-tracker';
import { BackgroundPipeline } from '../objects/background-pipeline';

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  player: Player;
  orbGroup: Phaser.GameObjects.Group;
  pointer: Phaser.Input.Pointer;
  score: number;
  playerHeightTracker: PlayerHeightTracker;
  bgPipeline: BackgroundPipeline;

  constructor() {
    super('MainGame');
  }

  preload() {
    this.load.atlas(
      'objects',
      'assets/endless/obj-pack-texture.png',
      'assets/endless/obj-pack-texture.json',
    );
    this.load.glsl('bgShader', 'assets/endless/shaders/background.frag');
  }

  create() {
    this.scene.launch('HUDScene');
    this.setupScore();

    const { screenWidth, screenHeight } = getGameWorldPamaters(this);

    this.setupGameWorld(screenWidth);
    this.createPlayer(screenWidth);
    this.setupCamera(screenWidth, screenHeight);
    this.setupBackgroundShader();

    setupDebugLines(this, screenWidth);

    this.orbGroup = this.add.group();

    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      this.pointer = pointer;
    });

    EventBus.emit(EventTypes.SCENE_READY, this);
    EventBus.on(EventTypes.PLAYER_LANDED, () => this.resetSession());
    EventBus.on(EventTypes.ZONE_CHANGED, this.updateBackgroundColor, this);
  }

  update(delta: number) {
    this.player.update(this.pointer);
    this.playerHeightTracker.update(this.player.y);
    this.camera.scrollY -= CAM_SCROLL_SPEED * (delta / 1000);
    // Send Player X to registry to be used in the HUDScene
    this.registry.set('playerX', this.player.x);
  }

  setupBackgroundShader() {
    const renderer = this.renderer as Phaser.Renderer.WebGL.WebGLRenderer;
    this.bgPipeline = new BackgroundPipeline(this.game);
    renderer.pipelines.add('BackgroundPipeline', this.bgPipeline);

    this.add
      .rectangle(0, 0, this.scale.width, this.scale.height, 0xffffff)
      .setOrigin(0)
      .setPipeline('BackgroundPipeline')
      .setScrollFactor(0)
      .setDepth(-1);

    const initialTop = ZONE_CONFIG[0].colorTop as [number, number, number];
    const initialBottom = ZONE_CONFIG[0].colorBottom as [number, number, number];
    this.bgPipeline.setGradient(initialTop, initialBottom);
  }

  updateBackgroundColor(zone: number) {
    if (!this.bgPipeline) return;

    const zoneData = ZONE_CONFIG[zone];
    const top = zoneData.colorTop as [number, number, number];
    const bottom = zoneData.colorBottom as [number, number, number];
    this.bgPipeline.fadeToGradient(top, bottom, 1000);
  }

  setupGameWorld(screenWidth: number) {
    this.physics.world.setBounds(0, 0, screenWidth, WORLD_HEIGHT);
  }

  setupScore() {
    this.score = 0;
    EventBus.on(EventTypes.SCORE_INCREASE, this.handleScoreIncrease, this);
    EventBus.on(EventTypes.SCORE_RESET, this.handleScoreReset, this);
    EventBus.on(EventTypes.SCORE_DECREASE, this.handleScoreDecrease, this);
  }

  handleScoreIncrease(increase: number) {
    this.score += increase;
    EventBus.emit(EventTypes.SCORE_UPDATED, this.score);
  }

  handleScoreDecrease(decrease: number) {
    this.score = Math.max(0, this.score - decrease);
    EventBus.emit(EventTypes.SCORE_UPDATED, this.score);
  }

  handleScoreReset() {
    this.score = 0;
    EventBus.emit(EventTypes.SCORE_UPDATED, this.score);
  }

  setupCamera(screenWidth: number, screenHeight: number) {
    this.camera = this.cameras.main;
    this.camera.setBounds(0, 0, screenWidth, WORLD_HEIGHT);
    this.camera.scrollY = screenWidth - screenHeight;
    this.camera.startFollow(this.player, false, 0, 1);
  }

  createPlayer(screenWidth: number) {
    const playerStartX = screenWidth / 2;
    const playerStartY = WORLD_HEIGHT;

    this.player = new Player(this, playerStartX, playerStartY, 'tst_idle');
    this.player.setScale(5);

    this.playerHeightTracker = new PlayerHeightTracker(this.player.y);
  }

  resetSession() {
    EventBus.emit(EventTypes.SCORE_RESET, this.score);
    generatePowerups(this, this.player, this.orbGroup);
  }

  shutdown() {
    EventBus.off(EventTypes.SCORE_INCREASE, this.handleScoreIncrease, this);
    EventBus.off(EventTypes.SCORE_DECREASE, this.handleScoreDecrease, this);
    EventBus.off(EventTypes.SCORE_RESET, this.handleScoreReset, this);
    EventBus.off(EventTypes.ZONE_CHANGED, this.updateBackgroundColor, this);
  }
}

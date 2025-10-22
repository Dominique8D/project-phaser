import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { Player } from '../objects/player';
import { generatePowerups, getGameWorldPamaters, setupDebugLines } from '../utils/game-utils';
import { EventTypes } from '../EventTypes';
import { CAM_SCROLL_SPEED, MAX_SCORE, WORLD_HEIGHT, ZONE_CONFIG } from '../utils/game-consts';
import { PlayerHeightTracker } from '../objects/player-height-tracker';
import { BackgroundPipeline } from '../objects/background-pipeline';
import { getAssetPath } from '../../utils/phaser-asset-loader';
import { HUD_SCENE_ID, MAIN_GAME_ID } from '../../game-consts/game-consts';
import { REG_HIGHSCORE, REG_PLAYER_X } from '../utils/registy-keys';

export class Game extends Scene {
  camera!: Phaser.Cameras.Scene2D.Camera;
  player!: Player;
  orbGroup!: Phaser.GameObjects.Group;
  pointer!: Phaser.Input.Pointer;
  score: number = 0;
  playerHeightTracker!: PlayerHeightTracker;
  bgPipeline!: BackgroundPipeline;

  constructor() {
    super(MAIN_GAME_ID);
  }

  preload() {
    this.load.atlas(
      'objects',
      getAssetPath('endless/obj-pack-texture.png'),
      getAssetPath('endless/obj-pack-texture.json'),
    );

    this.load.glsl('bgShader', getAssetPath('endless/shaders/background.frag'));

    const images = {
      enemy: 'enemyR.png',
      player_move: 'moveR.png',
      player_fall: 'fallR.png',
      player_plummet: 'plummetR.png',
    };

    Object.entries(images).forEach(([key, file]) => {
      this.load.image(key, getAssetPath(`endless/${file}`));
    });
  }

  create() {
    this.scene.launch(HUD_SCENE_ID);
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

    // Scene is ready to be used
    EventBus.emit(EventTypes.SCENE_READY, this);

    // Start listening now
    EventBus.on(EventTypes.PLAYER_LANDED, () => this.resetSession());
    EventBus.on(EventTypes.ZONE_CHANGED, this.updateBackgroundColor, this);

    // Handle clean up
    this.events.once('shutdown', () => {
      EventBus.off(EventTypes.PLAYER_LANDED);
      EventBus.off(EventTypes.ZONE_CHANGED, this.updateBackgroundColor, this);
      EventBus.off(EventTypes.SCORE_INCREASE, this.handleScoreIncrease, this);
      EventBus.off(EventTypes.SCORE_DECREASE, this.handleScoreDecrease, this);
      EventBus.off(EventTypes.SCORE_RESET, this.handleScoreReset, this);
    });
  }

  update(delta: number) {
    this.player.update(this.pointer);
    this.playerHeightTracker.update(this.player.y);
    this.camera.scrollY -= CAM_SCROLL_SPEED * (delta / 1000);
    this.registry.set(REG_PLAYER_X, this.player.x);
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
    this.score = Math.min(this.score + increase, MAX_SCORE);
    EventBus.emit(EventTypes.SCORE_UPDATED, this.score);
  }

  handleScoreDecrease(decrease: number) {
    this.score = Math.max(0, this.score - decrease);
    EventBus.emit(EventTypes.SCORE_UPDATED, this.score);
  }

  handleScoreReset() {
    const prevHighScore = this.registry.get(REG_HIGHSCORE) || 0;
    if (this.score > prevHighScore) {
      this.registry.set(REG_HIGHSCORE, this.score);
      EventBus.emit(EventTypes.HIGHSCORE_UPDATED, this.score);
    }

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

    this.player = new Player(this, playerStartX, playerStartY, 'player_move');
    this.player.setScale(2);

    this.playerHeightTracker = new PlayerHeightTracker(this.player.y);
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
    const zoneData = ZONE_CONFIG[zone];
    this.bgPipeline?.fadeToGradient(
      zoneData.colorTop as [number, number, number],
      zoneData.colorBottom as [number, number, number],
      1000,
    );
  }

  resetSession() {
    EventBus.emit(EventTypes.SCORE_RESET, this.score);
    generatePowerups(this, this.player, this.orbGroup);
  }
}

import { HUD_SCENE_ID, MAIN_GAME_ID } from '../../game-consts/game-consts';
import { EventBus } from '../EventBus';
import { EventTypes } from '../EventTypes';
import { EnemySpawnIndicator } from '../objects/enemy-spawn-indicator';
import { REG_PLAYER_X } from '../utils/registy-keys';
import { Game } from './Game';

export class HUDScene extends Phaser.Scene {
  private pauseOverlay?: Phaser.GameObjects.Graphics;

  constructor() {
    super({ key: HUD_SCENE_ID });
  }

  create() {
    EventBus.on(EventTypes.SPAWN_ZONE_HIT, this.createEnemySpawnIndicator, this);
    EventBus.on(EventTypes.GAME_PAUSE, this.showPauseOverlay, this);
    EventBus.on(EventTypes.GAME_RESUME, this.hidePauseOverlay, this);
  }

  private createEnemySpawnIndicator() {
    const topY = 30;
    const playerX = this.registry.get(REG_PLAYER_X);
    const gameScene = this.scene.get(MAIN_GAME_ID);
    if (gameScene) {
      const typedGameScene = gameScene as Game;
      const player = typedGameScene.player;
      new EnemySpawnIndicator(this, playerX, topY, gameScene, player);
    }
  }

  private showPauseOverlay() {
    const { width, height } = this.scale;
    const centerX = width / 2;
    const centerY = height / 2;
    const size = 80;

    this.pauseOverlay = this.add.graphics();
    this.pauseOverlay.setDepth(1000);
    this.pauseOverlay.setScrollFactor(0);

    // Fade background
    this.pauseOverlay.fillStyle(0x000000, 0.4);
    this.pauseOverlay.fillRect(0, 0, width, height);

    // Play triangle
    this.pauseOverlay.fillStyle(0xffffff, 1);
    this.pauseOverlay.beginPath();
    this.pauseOverlay.moveTo(centerX - size / 2, centerY - size);
    this.pauseOverlay.lineTo(centerX - size / 2, centerY + size);
    this.pauseOverlay.lineTo(centerX + size, centerY);
    this.pauseOverlay.closePath();
    this.pauseOverlay.fillPath();
  }

  private hidePauseOverlay() {
    this.pauseOverlay?.destroy();
    this.pauseOverlay = undefined;
  }

  shutdown() {
    EventBus.off(EventTypes.SPAWN_ZONE_HIT, this.createEnemySpawnIndicator, this);
    EventBus.off(EventTypes.GAME_PAUSE, this.showPauseOverlay, this);
    EventBus.off(EventTypes.GAME_RESUME, this.hidePauseOverlay, this);
  }
}


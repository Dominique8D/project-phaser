import { HUD_SCENE_ID, MAIN_GAME_ID } from '../../game-consts/game-consts';
import { EventBus } from '../EventBus';
import { EventTypes } from '../EventTypes';
import { EnemySpawnIndicator } from '../objects/enemy-spawn-indicator';
import { REG_PLAYER_X } from '../utils/registy-keys';
import { Game } from './Game';

export class HUDScene extends Phaser.Scene {
  constructor() {
    super({ key: HUD_SCENE_ID });
  }

  create() {
    EventBus.on(EventTypes.SPAWN_ZONE_HIT, this.createEnemySpawnIndicator, this);
  }
  createEnemySpawnIndicator() {
    const topY = 30;
    const playerX = this.registry.get(REG_PLAYER_X);
    const gameScene = this.scene.get(MAIN_GAME_ID);
    if (gameScene) {
      const typedGameScene = gameScene as Game;
      const player = typedGameScene.player;
      new EnemySpawnIndicator(this, playerX, topY, gameScene, player);
    }
  }

  shutdown() {
    EventBus.off(EventTypes.SPAWN_ZONE_HIT, this.createEnemySpawnIndicator, this);
  }
}


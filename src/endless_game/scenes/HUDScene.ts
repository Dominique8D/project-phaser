import { EventBus } from '../EventBus';
import { EventTypes } from '../EventTypes';
import { EnemySpawnIndicator } from '../objects/enemy-spawn-indicator';

export class HUDScene extends Phaser.Scene {
  scoreText!: Phaser.GameObjects.Text;
  enemySpawnIndicator: Phaser.GameObjects.Image | null = null;

  constructor() {
    super({ key: 'HUDScene' });
  }

  create() {
    this.scoreText = this.add.text(16, 16, '0', {
      fontSize: '24px',
      color: '#ffffff',
    });

    EventBus.on(EventTypes.SCORE_UPDATED, this.updateScoreDisplay, this);
    EventBus.on(EventTypes.SPAWN_ZONE_HIT, this.createEnemySpawnIndicator, this);
  }

  private updateScoreDisplay(newScore: number) {
    this.scoreText.setText(`${newScore}`);
  }

  private createEnemySpawnIndicator() {
    const topY = 30;
    const playerX = this.registry.get('playerX');
    new EnemySpawnIndicator(this, playerX, topY);
  }

  shutdown() {
    EventBus.off(EventTypes.SCORE_UPDATED, this.updateScoreDisplay, this);
    EventBus.off(EventTypes.SPAWN_ZONE_HIT, this.createEnemySpawnIndicator, this);
  }
}


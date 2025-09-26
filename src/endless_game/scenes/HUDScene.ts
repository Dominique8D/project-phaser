import { EventBus } from '../EventBus';
import { EventTypes } from '../EventTypes';
import { EnemySpawnIndicator } from '../objects/enemy-spawn-indicator';
import { Game } from './Game';

export class HUDScene extends Phaser.Scene {
  scoreText!: Phaser.GameObjects.Text;
  highscoreText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'HUDScene' });
  }

  create() {
    const textStyle = {
      fontSize: '24px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 5,
    };

    this.scoreText = this.add.text(0, 0, '0', textStyle).setOrigin(0, 0);

    this.highscoreText = this.add
      .text(32, 0, '0', {
        ...textStyle,
        color: '#ffff00',
      })
      .setOrigin(0, 0);

    const savedHigh = this.registry.get('highscore') || 0;
    this.highscoreText.setText(savedHigh.toString());

    EventBus.on(EventTypes.SCORE_UPDATED, this.updateScoreDisplay, this);
    EventBus.on(EventTypes.HIGHSCORE_UPDATED, this.updateHighscoreDisplay, this);
    EventBus.on(EventTypes.SPAWN_ZONE_HIT, this.createEnemySpawnIndicator, this);
  }

  updateScoreDisplay(newScore: number) {
    this.scoreText.setText(`${newScore}`);
  }

  updateHighscoreDisplay(newHigh: number) {
    this.highscoreText.setText(`${newHigh}`);
  }

  createEnemySpawnIndicator() {
    const topY = 30;
    const playerX = this.registry.get('playerX');

    const gameScene = this.scene.get('MainGame') as Game;
    const player = gameScene.player;

    new EnemySpawnIndicator(this, playerX, topY, gameScene, player);
  }

  shutdown() {
    EventBus.off(EventTypes.SCORE_UPDATED, this.updateScoreDisplay, this);
    EventBus.off(EventTypes.HIGHSCORE_UPDATED, this.updateHighscoreDisplay, this);
    EventBus.off(EventTypes.SPAWN_ZONE_HIT, this.createEnemySpawnIndicator, this);
  }
}


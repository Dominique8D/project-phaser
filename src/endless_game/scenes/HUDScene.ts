import { EventBus } from '../EventBus';
import { EventTypes } from '../EventTypes';

export class HUDScene extends Phaser.Scene {
  private scoreText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'HUDScene' });
  }

  create() {
    this.scoreText = this.add.text(16, 16, '0', {
      fontSize: '24px',
      color: '#ffffff',
    });

    EventBus.on(EventTypes.SCORE_UPDATED, this.updateScoreDisplay, this);
  }

  private updateScoreDisplay(newScore: number) {
    this.scoreText.setText(`${newScore}`);
  }

  shutdown() {
    EventBus.off(EventTypes.SCORE_UPDATED, this.updateScoreDisplay, this);
  }
}


export class HUDScene extends Phaser.Scene {
  private scoreText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'HUDScene' });
  }

  create() {
    this.scoreText = this.add.text(16, 16, 'Score: 0', {
      fontSize: '24px',
      color: '#ffffff',
    });

    this.events.on('updateScore', (score: number) => {
      this.scoreText.setText('Score: ' + score);
    });
  }
}


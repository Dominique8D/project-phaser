export class TargetIndicator extends Phaser.GameObjects.Image {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'tst_powerup');
    this.setOrigin(0.5);
    this.setAlpha(0.8);
    this.setScale(2);
    scene.add.existing(this);
  }

  followPointer(pointer: Phaser.Input.Pointer) {
    const targetX = pointer.worldX;
    const targetY = pointer.worldY;

    const lerpFactor = 0.1;
    const newX = Phaser.Math.Linear(this.x, targetX, lerpFactor);
    const newY = Phaser.Math.Linear(this.y, targetY, lerpFactor);

    this.setPosition(newX, newY);
  }
}


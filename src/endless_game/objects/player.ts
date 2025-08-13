import Phaser from 'phaser';

export class Player extends Phaser.Physics.Arcade.Sprite {
  private leftBound: number;
  private rightBound: number;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);

    const screenWidth = scene.scale.width;
    const margin = screenWidth * 0.025;

    this.leftBound = margin + this.width / 2;
    this.rightBound = screenWidth - margin - this.width / 2;
  }

  public update(pointer?: Phaser.Input.Pointer) {
    if (!pointer) return;

    if (pointer.worldX >= this.leftBound && pointer.worldX <= this.rightBound) {
      this.setX(pointer.worldX);
    }
  }
}


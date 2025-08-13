import Phaser from 'phaser';

export class Player extends Phaser.Physics.Arcade.Sprite {
  private leftBound: number;
  private rightBound: number;
  private bodyRef: Phaser.Physics.Arcade.Body;
  private readonly jumpPower: number = 500;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);

    this.bodyRef = this.body as Phaser.Physics.Arcade.Body;
    this.setBounce(0.5);

    const screenWidth = scene.scale.width;
    const margin = screenWidth * 0.025;

    this.leftBound = margin + this.width / 2;
    this.rightBound = screenWidth - margin - this.width / 2;

    scene.input.on('pointerdown', () => {
      this.jump();
    });
  }

  public update(pointer?: Phaser.Input.Pointer) {
    if (!pointer) return;

    if (pointer.worldX >= this.leftBound && pointer.worldX <= this.rightBound) {
      this.setX(pointer.worldX);
    }
  }

  private jump() {
    if (this.bodyRef.blocked.down) {
      this.setVelocityY(-this.jumpPower);
    }
  }
}


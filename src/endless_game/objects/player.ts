import Phaser from 'phaser';

export class Player extends Phaser.Physics.Arcade.Sprite {
  private leftBound: number;
  private rightBound: number;
  private bodyRef: Phaser.Physics.Arcade.Body;
  private readonly jumpPower: number = 600;
  private readonly maxFallSpeed: number = 2000;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);

    this.bodyRef = this.body as Phaser.Physics.Arcade.Body;
    this.bodyRef.setMaxVelocity(this.bodyRef.maxVelocity.x, this.maxFallSpeed);
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
    const lerpFactor = 0.1;
    const targetX = Phaser.Math.Clamp(pointer.worldX, this.leftBound, this.rightBound);
    const newX = Phaser.Math.Linear(this.x, targetX, lerpFactor);
    this.setX(newX);
  }

  public jump(ignoreGround: boolean = false) {
    if (this.bodyRef.blocked.down || ignoreGround) {
      this.setVelocityY(0);
      const multiplier = ignoreGround ? 1.25 : 1;
      this.setVelocityY(-this.jumpPower * multiplier);
    }
  }
}


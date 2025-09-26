import Phaser from 'phaser';
import { EventTypes } from '../EventTypes';
import { EventBus } from '../EventBus';

export class Player extends Phaser.Physics.Arcade.Sprite {
  readonly jumpPower: number = 600;
  readonly maxFallSpeed: number = 2000;
  bodyRef: Phaser.Physics.Arcade.Body;
  hasTouchedGround: boolean = false;
  hasLanded: boolean = false;
  leftBound: number;
  rightBound: number;

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
    if (pointer) {
      const lerpFactor = 0.1;
      const targetX = Phaser.Math.Clamp(pointer.worldX, this.leftBound, this.rightBound);
      const newX = Phaser.Math.Linear(this.x, targetX, lerpFactor);
      this.setX(newX);
    }

    this.updateLandedState();
  }

  public jump(ignoreGround: boolean = false) {
    if (this.bodyRef.blocked.down || ignoreGround) {
      this.setVelocityY(0);
      const multiplier = ignoreGround ? 1.25 : 1;
      this.setVelocityY(-this.jumpPower * multiplier);
    }
  }

  public dampenVerticalMovement(factor: number = 0.5) {
    const currentY = this.bodyRef.velocity.y;
    this.bodyRef.setVelocityY(currentY * factor);
  }

  updateLandedState() {
    const touchingGround = this.bodyRef.blocked.down;
    const verticalVelocity = Math.abs(this.bodyRef.velocity.y);
    const landingVelocityThreshold = 5;

    if (touchingGround && !this.hasTouchedGround) {
      this.hasTouchedGround = true;
    }

    if (this.hasTouchedGround && !this.hasLanded && verticalVelocity < landingVelocityThreshold) {
      this.hasLanded = true;
      EventBus.emit(EventTypes.PLAYER_LANDED);
    }

    if (!touchingGround) {
      this.hasTouchedGround = false;
      this.hasLanded = false;
    }
  }

  isLanded(): boolean {
    return this.hasLanded;
  }
}


import Phaser from 'phaser';
import { EventTypes } from '../EventTypes';
import { EventBus } from '../EventBus';

enum PlayerState {
  Idle = 'idle',
  Fall = 'fall',
  Jump = 'jump',
}

export class Player extends Phaser.Physics.Arcade.Sprite {
  readonly jumpPower: number = 600;
  readonly maxFallSpeed: number = 3000;
  currentState: PlayerState = PlayerState.Idle;
  bodyRef: Phaser.Physics.Arcade.Body;

  reverseMode: boolean = false;
  firstUpdateDone: boolean = false;

  wasOnGround: boolean = false;
  wasOnCeiling: boolean = false;

  leftBound: number;
  rightBound: number;
  lastPointerX: number;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);

    this.bodyRef = this.body as Phaser.Physics.Arcade.Body;
    this.bodyRef.setMaxVelocity(this.bodyRef.maxVelocity.x, this.maxFallSpeed);

    const screenWidth = scene.scale.width;
    const margin = screenWidth * 0.025;

    this.leftBound = margin + this.width / 2;
    this.rightBound = screenWidth - margin - this.width / 2;

    this.lastPointerX = x;

    scene.input.on('pointerdown', () => {
      this.jump();
    });
  }

  public update(pointer?: Phaser.Input.Pointer) {
    if (!this.firstUpdateDone) {
      this.firstUpdateDone = true;
      return;
    }

    if (pointer) {
      const lerpFactor = 0.1;
      const targetX = Phaser.Math.Clamp(pointer.worldX, this.leftBound, this.rightBound);
      const newX = Phaser.Math.Linear(this.x, targetX, lerpFactor);
      this.setX(newX);

      if (targetX < this.lastPointerX) this.setFlipX(true);
      else if (targetX > this.lastPointerX) this.setFlipX(false);

      this.lastPointerX = targetX;
    }

    this.updateGravityFlipLogic();
    this.updateState();
  }

  private isOnSurface(): boolean {
    return this.reverseMode ? this.bodyRef.blocked.up : this.bodyRef.blocked.down;
  }

  private getJumpVelocity(ignoreGround: boolean): number {
    const base = this.jumpPower * (ignoreGround ? 1.25 : 1);
    return this.reverseMode ? base : -base;
  }

  public jump(ignoreGround: boolean = false) {
    if (this.isOnSurface() || ignoreGround) {
      this.setVelocityY(0);
      this.setVelocityY(this.getJumpVelocity(ignoreGround));
      if (!ignoreGround) EventBus.emit(EventTypes.PLAYER_JUMP);
    }
  }

  public dampenVerticalMovement(factor: number = 0.5) {
    const currentY = this.bodyRef.velocity.y;
    this.bodyRef.setVelocityY(currentY * factor);
  }

  private flipGravity() {
    this.reverseMode = !this.reverseMode;
    this.setFlipY(this.reverseMode);

    const worldGravity = this.scene.physics.world.gravity.y;
    const newGravity = this.reverseMode ? -2 * worldGravity : 0;

    this.bodyRef.setGravityY(newGravity);

    const newVel = this.reverseMode
      ? -Math.abs(this.bodyRef.velocity.y)
      : Math.abs(this.bodyRef.velocity.y);

    this.bodyRef.setVelocityY(newVel);
  }

  updateGravityFlipLogic() {
    const touchingGround = this.bodyRef.blocked.down;
    const touchingCeiling = this.bodyRef.blocked.up;

    if (touchingGround && !this.wasOnGround) {
      this.wasOnGround = true;

      if (!this.reverseMode) {
        EventBus.emit(EventTypes.PLAYER_LANDED);
      } else {
        this.flipGravity();
        EventBus.emit(EventTypes.PLAYER_LANDED);
      }
    }

    if (!touchingGround) {
      this.wasOnGround = false;
    }

    if (touchingCeiling && !this.wasOnCeiling) {
      this.wasOnCeiling = true;

      if (!this.reverseMode) {
        this.flipGravity();
        EventBus.emit(EventTypes.PLAYER_HIT_CEILING);
      } else {
        EventBus.emit(EventTypes.PLAYER_HIT_CEILING);
      }
    }

    if (!touchingCeiling) {
      this.wasOnCeiling = false;
    }
  }

  updateState() {
    const velocityY = this.bodyRef.velocity.y;

    let newState: PlayerState;

    if (this.isOnSurface()) {
      newState = PlayerState.Idle;
    } else if ((this.reverseMode && velocityY > 0) || (!this.reverseMode && velocityY < 0)) {
      newState = PlayerState.Jump;
    } else {
      newState = PlayerState.Fall;
    }

    if (newState !== this.currentState) {
      this.currentState = newState;
      this.updateSprite();
    }
  }

  updateSprite() {
    switch (this.currentState) {
      case PlayerState.Idle:
        this.setTexture('player_idle');
        break;
      case PlayerState.Fall:
        this.setTexture('player_fall');
        break;
      case PlayerState.Jump:
        this.setTexture('player_jump');
        break;
    }
  }
}

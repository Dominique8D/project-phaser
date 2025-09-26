import { EventBus } from '../EventBus';
import { EventTypes } from '../EventTypes';
import { Player } from './player';

const SCALE = 5;
const MIN_DURATION = 1500;
const MAX_DURATION = 3000;
const EDGE_MARGIN_RATIO = 0.2;
const OFFSCREEN_MULTIPLIER = 2;
const MIN_Y_RATIO = 0.5;
const MAX_Y_OFFSET_RATIO = 0.4;
const DESTROY_BUFFER_MULTIPLIER = 1.5;

export class Enemy extends Phaser.Physics.Arcade.Sprite {
  sceneRef: Phaser.Scene;

  constructor(scene: Phaser.Scene, x: number, y: number, player: Player) {
    super(scene, x, y, 'tst_jmp');
    this.sceneRef = scene;

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setScale(SCALE);
    (this.body as Phaser.Physics.Arcade.Body).allowGravity = false;

    const { targetX, targetY } = this.getTargetPosition();
    this.startMovement(targetX, targetY);

    // Handle player collision
    scene.physics.add.overlap(this, player, () => {
      player.dampenVerticalMovement();
      EventBus.emit(EventTypes.SCORE_DECREASE, 1);
      this.destroy();
    });
  }

  getTargetPosition(): { targetX: number; targetY: number } {
    const camera = this.sceneRef.cameras.main;
    const screenWidth = camera.width;
    const screenHeight = camera.height;
    const scrollX = camera.scrollX;
    const scrollY = camera.scrollY;

    const margin = screenWidth * EDGE_MARGIN_RATIO;
    const distanceToLeft = this.x - scrollX;
    const distanceToRight = scrollX + screenWidth - this.x;

    let direction: 'left' | 'right';
    if (distanceToLeft < margin) {
      direction = 'right';
    } else if (distanceToRight < margin) {
      direction = 'left';
    } else {
      direction = Phaser.Math.RND.pick(['left', 'right']);
    }

    const offsetX = this.width * OFFSCREEN_MULTIPLIER;
    const targetX = direction === 'right' ? scrollX + screenWidth + offsetX : scrollX - offsetX;

    const minY = scrollY + screenHeight * MIN_Y_RATIO;
    const maxY = scrollY + screenHeight + screenHeight * MAX_Y_OFFSET_RATIO;
    const targetY = Phaser.Math.Between(minY, maxY);

    return { targetX, targetY };
  }

  startMovement(targetX: number, targetY: number): void {
    this.sceneRef.tweens.add({
      targets: this,
      x: targetX,
      y: targetY,
      duration: Phaser.Math.Between(MIN_DURATION, MAX_DURATION),
      ease: 'Sine.easeInOut',
      onUpdate: () => this.checkOffscreen(),
    });
  }

  checkOffscreen(): void {
    const cam = this.sceneRef.cameras.main;
    const buffer = this.width * DESTROY_BUFFER_MULTIPLIER;

    const outOfView =
      this.x < cam.scrollX - buffer ||
      this.x > cam.scrollX + cam.width + buffer ||
      this.y > cam.scrollY + cam.height + buffer;

    if (outOfView) {
      this.destroy();
    }
  }
}


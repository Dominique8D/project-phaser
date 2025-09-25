import { Enemy } from './enemy';

const MARGIN_RATIO = 0.1;
const MAX_MOVE_RATIO = 0.4;
const MIN_MOVE_RATIO = 0.1;
const MOVE_DIST_MULTIPLIER = 0.7;
const SPAWN_TIME = 2000;
const INDICATOR_SCALE = 3;
const ENEMY_OFFSET_Y = 100;

export class EnemySpawnIndicator {
  scene: Phaser.Scene;
  image: Phaser.GameObjects.Image;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene;
    this.image = scene.add.image(x, y, 'tst_fall').setScale(INDICATOR_SCALE);

    const targetX = this.getTargetX(x);

    scene.tweens.add({
      targets: this.image,
      x: targetX,
      duration: SPAWN_TIME,
      ease: 'Sine.easeInOut',
      onComplete: () => {
        new Enemy(this.scene, this.image.x, this.image.y - ENEMY_OFFSET_Y);
        this.image.destroy();
      },
    });
  }

  private getTargetX(x: number): number {
    const camera = this.scene.cameras.main;
    const screenWidth = camera.width;
    const scrollX = camera.scrollX;

    const margin = screenWidth * MARGIN_RATIO;
    const maxMove = screenWidth * MAX_MOVE_RATIO;
    const minMove = screenWidth * MIN_MOVE_RATIO;

    const worldX = x + scrollX;
    const distanceToLeft = worldX - scrollX;
    const distanceToRight = scrollX + screenWidth - worldX;

    let moveDistance = Phaser.Math.Between(maxMove * MOVE_DIST_MULTIPLIER, maxMove);

    if (distanceToLeft >= margin && distanceToRight >= margin) {
      moveDistance = Phaser.Math.Between(minMove, maxMove * MOVE_DIST_MULTIPLIER);
    }

    const direction =
      distanceToLeft < margin
        ? 'right'
        : distanceToRight < margin
          ? 'left'
          : Phaser.Math.RND.pick(['left', 'right']);

    const targetX = direction === 'right' ? x + moveDistance : x - moveDistance;
    const halfWidth = this.image.displayWidth / 2;
    const minX = scrollX + halfWidth;
    const maxX = scrollX + screenWidth - halfWidth;

    return Phaser.Math.Clamp(targetX, minX, maxX);
  }
}


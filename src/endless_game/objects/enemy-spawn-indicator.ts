import { EventBus } from '../EventBus';
import { EventTypes } from '../EventTypes';
import { Enemy } from './enemy';
import { Player } from './player';

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

  constructor(
    hudScene: Phaser.Scene,
    x: number,
    y: number,
    gameScene: Phaser.Scene,
    player: Player,
  ) {
    this.scene = hudScene;
    this.image = hudScene.add.image(x, y, 'tst_fall').setScale(INDICATOR_SCALE);
    EventBus.emit(EventTypes.ENEMY_SPAWN);

    const targetX = this.getTargetX(x);

    hudScene.tweens.add({
      targets: this.image,
      x: targetX,
      duration: SPAWN_TIME,
      ease: 'Sine.easeInOut',
      onComplete: () => {
        const gameCam = gameScene.cameras.main;
        const worldX = this.image.x + gameCam.scrollX;
        const worldY = this.image.y + gameCam.scrollY;

        EventBus.emit(EventTypes.ENEMY_ENTER);
        new Enemy(gameScene, worldX, worldY - ENEMY_OFFSET_Y, player);
        this.image.destroy();
      },
    });
  }

  getTargetX(x: number): number {
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


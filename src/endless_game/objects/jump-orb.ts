import { EventBus } from '../EventBus';
import { EventTypes } from '../EventTypes';
import { Player } from './player';

export class JumpOrb extends Phaser.Physics.Arcade.Sprite {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame: string,
    scoreIncrease: number,
    player: Player,
  ) {
    super(scene, x, y, texture, frame);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    (this.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
    this.setImmovable(true);

    scene.physics.add.overlap(this, player, () => {
      player.jump(true);
      this.destroy();
      EventBus.emit(EventTypes.SCORE_INCREASE, scoreIncrease);
    });
  }
}


import { Scene } from 'phaser';

export class Boot extends Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
    //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

    this.load.image('background', 'assets/bg.png');

    this.load.image('tst_fall', 'assets/endless/tst_fall.png');
    this.load.image('tst_idle', 'assets/endless/tst_idle.png');
    this.load.image('tst_jmp', 'assets/endless/tst_jmp.png');
    this.load.image('tst_move', 'assets/endless/tst_move.png');
    this.load.image('tst_plummet', 'assets/endless/tst_plummet.png');
    this.load.image('tst_powerup', 'assets/endless/tst_powerup.png');
    this.load.image('tst_step', 'assets/endless/tst_step.png');
  }

  create() {
    this.scene.start('Preloader');
  }
}

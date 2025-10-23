import { Scene } from 'phaser';
import { getAssetPath } from '../../utils/phaser-asset-loader';

export class Boot extends Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
    //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

    const endlessAssets = ['tst_fall', 'tst_powerup'];

    endlessAssets.forEach((key) => {
      this.load.image(key, getAssetPath(`endless/${key}.png`));
    });
  }

  create() {
    this.scene.start('Preloader');
  }
}

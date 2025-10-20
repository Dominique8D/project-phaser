export interface Translations {
  [key: string]: string;
}

export interface IRefPhaserGame {
  game: Phaser.Game | null;
  scene: Phaser.Scene | null;
}

export interface IGameProps {
  currentActiveScene?: (scene_instance: Phaser.Scene) => void;
  translations: Translations;
}
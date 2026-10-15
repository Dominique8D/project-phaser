import { Boot } from './scenes/Boot';
import { GameOver } from './scenes/GameOver';
import { Game as MainGame } from './scenes/Game';
import { MainMenu } from './scenes/MainMenu';
import { AUTO, Game } from 'phaser';
import { Preloader } from './scenes/Preloader';
import { GAME_CONTAINER_ID } from '../game-consts/game-consts';
import { GAME_COLORS } from '../theme/game-colors';

const config: Phaser.Types.Core.GameConfig = {
  type: AUTO,
  width: 1024,
  height: 768,
  parent: GAME_CONTAINER_ID,
  backgroundColor: GAME_COLORS.backgroundTest,
  scene: [Boot, Preloader, MainMenu, MainGame, GameOver],
};

const StartGame = (parent: string) => {
  return new Game({ ...config, parent });
};

export default StartGame;

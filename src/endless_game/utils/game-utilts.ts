import { Scene } from 'phaser';
import { JumpOrb } from '../objects/jump-orb';
import { POWERUP_CONFIG, WORLD_HEIGHT } from './game-consts';
import { Player } from '../objects/player';

export function getGameWorldPamaters(scene: Scene) {
  const screenWidth = scene.scale.width;
  const screenHeight = scene.scale.height;

  return {
    screenWidth,
    screenHeight,
  };
}

export function generatePowerups(
  scene: Phaser.Scene,
  player: Player,
  orbGroup: Phaser.GameObjects.Group,
): void {
  orbGroup.clear(true, true);

  const { spacingY, marginX, scale, zones, verticalOffset } = POWERUP_CONFIG;
  const screenWidth = scene.scale.width;
  const zoneWidth = (screenWidth - 2 * marginX) / zones;
  const numPowerups = Math.floor((WORLD_HEIGHT - verticalOffset) / spacingY);

  for (let i = 0; i < numPowerups; i++) {
    const y = WORLD_HEIGHT - verticalOffset - i * spacingY;
    const zoneIndex = i % zones;
    const baseX = marginX + zoneIndex * zoneWidth;
    const x = Phaser.Math.Between(baseX, baseX + zoneWidth);

    const orb = new JumpOrb(scene, x, y, 'jump-orb', player).setScale(scale).setTint(0xfced4a);

    orbGroup.add(orb);
  }
}

export function setupDebugLines(scene: Scene, worldWidth: number) {
  const groundLine = scene.add.graphics();
  groundLine.lineStyle(20, 0xff0000, 1);
  groundLine.beginPath();
  groundLine.moveTo(0, WORLD_HEIGHT);
  groundLine.lineTo(worldWidth, WORLD_HEIGHT);
  groundLine.strokePath();

  const topLine = scene.add.graphics();
  topLine.lineStyle(20, 0x00ff00, 1);
  topLine.beginPath();
  topLine.moveTo(0, 0);
  topLine.lineTo(worldWidth, 0);
  topLine.strokePath();
}


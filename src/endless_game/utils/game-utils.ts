import { Scene } from 'phaser';
import { JumpOrb } from '../objects/jump-orb';
import { JUNK_PART_SPRITES, POWERUP_CONFIG, WORLD_HEIGHT } from './game-consts';
import { Player } from '../objects/player';
import { SoundManager } from './sound-manager';

export function setupSoundManager(scene: Phaser.Scene): SoundManager {
  return new SoundManager(scene);
}

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
  orbGroup: Phaser.GameObjects.Group | undefined,
): void {
  if (!orbGroup || !orbGroup.children || typeof orbGroup.children.size !== 'number') {
    return;
  }

  orbGroup.clear(true, true);

  const {
    ySpacings,
    marginX,
    scale,
    zones,
    verticalOffset,
    junkOrbInterval,
    orbColors,
    maxDiff,
    diffIncreaseValue,
  } = POWERUP_CONFIG;

  let diffLevel = 0;
  const screenWidth = scene.scale.width;
  const zoneWidth = (screenWidth - 2 * marginX) / zones;

  let y = WORLD_HEIGHT - verticalOffset;
  let i = 0;

  while (y > 0) {
    const spacingY = ySpacings[diffLevel];
    const zoneIndex = i % zones;
    const baseX = marginX + zoneIndex * zoneWidth;
    const x = Phaser.Math.Between(baseX, baseX + zoneWidth);

    const shouldBeJunkPart = i > 0 && i % junkOrbInterval === 0;
    const orbScoreIncrease = shouldBeJunkPart ? 1 : 0;
    const orbSprite = shouldBeJunkPart
      ? `${Phaser.Utils.Array.GetRandom(JUNK_PART_SPRITES)}.png`
      : 'step.png';

    const orb = new JumpOrb(scene, x, y, 'objects', orbSprite, orbScoreIncrease, player)
      .setScale(scale)
      .setTint(shouldBeJunkPart ? undefined : orbColors[diffLevel]);

    orbGroup.add(orb);

    y -= spacingY;
    i++;
    if (i % diffIncreaseValue === 0 && diffLevel < Math.min(maxDiff, ySpacings.length - 1)) {
      diffLevel++;
    }
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


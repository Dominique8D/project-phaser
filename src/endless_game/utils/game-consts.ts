export const POWERUP_CONFIG = {
  ySpacings: [100, 150, 200, 250],
  marginX: 100,
  scale: 1.5,
  zones: 3,
  verticalOffset: 200,
  junkOrbInterval: 8,
  orbColors: [0xfced4a, 0xfca63a, 0xf85a2a, 0xff0000],
  maxDiff: 4,
  diffIncreaseValue: 100,
};

export const WORLD_HEIGHT = 100000;

export const JUNK_PART_SPRITES = ['nut', 'bolt', 'spring', 'gear', 'ramstick', 'pcb'];

export const CAM_SCROLL_SPEED = 120;

export const ZONE_CONFIG = [
  {
    limit: 5000,
    colorTop: [0.85, 0.95, 1.0],
    colorBottom: [0.75, 0.85, 0.95],
    enemySpawnInterval: 10000,
  },
  {
    limit: 10000,
    colorTop: [0.65, 0.85, 1.0],
    colorBottom: [0.55, 0.75, 0.95],
    enemySpawnInterval: 9000,
  },
  {
    limit: 15000,
    colorTop: [0.7, 0.5, 0.8],
    colorBottom: [0.5, 0.3, 0.6],
    enemySpawnInterval: 8000,
  },
  {
    limit: 20000,
    colorTop: [0.2, 0.3, 0.5],
    colorBottom: [0.15, 0.2, 0.35],
    enemySpawnInterval: 7000,
  },
  {
    limit: 25000,
    colorTop: [0.1, 0.15, 0.25],
    colorBottom: [0.08, 0.1, 0.2],
    enemySpawnInterval: 6000,
  },
  {
    limit: 30000,
    colorTop: [0.4, 1.0, 0.8],
    colorBottom: [0.3, 0.7, 0.6],
    enemySpawnInterval: 5000,
  },
  {
    limit: 35000,
    colorTop: [0.9, 0.9, 0.95],
    colorBottom: [0.75, 0.75, 0.8],
    enemySpawnInterval: 4500,
  },
  {
    limit: Infinity,
    colorTop: [1.0, 0.7, 0.3],
    colorBottom: [0.9, 0.5, 0.2],
    enemySpawnInterval: 3000,
  },
];


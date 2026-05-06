export const WORLD_HEIGHT = 100000;

export const TOTAL_DIGITS = 5;
export const MAX_SCORE = parseInt('9'.repeat(TOTAL_DIGITS));

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

export const JUNK_PART_SPRITES = ['nut', 'bolt', 'spring', 'gear', 'ramstick', 'pcb'];

export const CAM_SCROLL_SPEED = 120;

export const ZONE_CONFIG = [
  {
    limit: 5000,
    colorTop: [0.98, 0.72, 0.55],
    colorBottom: [0.95, 0.55, 0.35],
    cloudColor: [1.0, 0.9, 0.75],
  },
  {
    limit: 10000,
    colorTop: [1.0, 0.88, 0.6],
    colorBottom: [0.98, 0.78, 0.45],
    cloudColor: [1.0, 0.92, 0.7],
  },
  {
    limit: 15000,
    colorTop: [0.87, 0.96, 1.0],
    colorBottom: [0.75, 0.91, 1.0],
    cloudColor: [1.0, 1.0, 1.0],
  },
  {
    limit: 20000,
    colorTop: [0.55, 0.8, 1.0],
    colorBottom: [0.4, 0.71, 1.0],
    cloudColor: [0.97, 0.99, 1.0],
  },
  {
    limit: 25000,
    colorTop: [0.35, 0.56, 0.75],
    colorBottom: [0.29, 0.48, 0.64],
    cloudColor: [0.92, 0.96, 1.0],
  },
  {
    limit: 30000,
    colorTop: [0.42, 0.36, 0.62],
    colorBottom: [0.31, 0.27, 0.48],
    cloudColor: [0.88, 0.9, 0.96],
  },
  {
    limit: 35000,
    colorTop: [0.1, 0.08, 0.2],
    colorBottom: [0.07, 0.06, 0.15],
    cloudColor: [0.8, 0.82, 0.9],
  },
  {
    limit: Infinity,
    colorTop: [0.03, 0.03, 0.07],
    colorBottom: [0.01, 0.01, 0.05],
    cloudColor: [0.7, 0.75, 0.85],
  },
];

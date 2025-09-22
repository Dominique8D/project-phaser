export const POWERUP_CONFIG = {
  ySpacings: [100, 150, 200, 250],
  marginX: 100,
  scale: 1.5,
  zones: 3,
  verticalOffset: 200,
  junkOrbInterval: 8,
  orbColors: [0xfced4a, 0xfca63a, 0xf85a2a, 0xff0000],
  maxDiff: 4,
  diffIncreaseValue: 20,
};

export const WORLD_HEIGHT = 10000;

export const JUNK_PART_SPRITES = ['nut', 'bolt', 'spring', 'gear', 'ramstick', 'pcb'];

export const CAM_SCROLL_SPEED = 120;

// ZONE COLOR SETUP
export const ZONE_LIMITS = [2000, 4000, 6000, 8000, 10000, 12000, 14000, Infinity];

export const ZONE_COLORS: [number, number, number][] = [
  [0.95, 0.75, 0.85],
  [0.9, 0.9, 0.6],
  [0.4, 0.3, 0.6],
  [0.1, 0.1, 0.2],
  [0.02, 0.05, 0.1],
  [0.2, 1.0, 0.6],
  [0.8, 0.8, 0.9],
  [1.0, 0.6, 0.0],
];

export const ZONE_FALLBACK_COLOR: [number, number, number] = [0.2, 0.2, 0.2];

export const ZONE_CONFIG = ZONE_LIMITS.map((limit, index) => ({
  limit,
  color: ZONE_COLORS[index] ?? ZONE_FALLBACK_COLOR,
}));


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

export const ENEMY_SPAWN_INTERVAL = 5000;

export const ZONE_CONFIG = [
  {
    limit: 5000,
    colorTop: [0.85, 0.95, 1.0], // Morning sky (bright blue)
    colorBottom: [0.75, 0.85, 0.95], // Soft blue
  },
  {
    limit: 10000,
    colorTop: [0.65, 0.85, 1.0], // Midday sky (vivid sky blue)
    colorBottom: [0.55, 0.75, 0.95], // Gentle cyan
  },
  {
    limit: 15000,
    colorTop: [0.7, 0.5, 0.8], // Evening sky (lavender)
    colorBottom: [0.5, 0.3, 0.6], // Deep violet
  },
  {
    limit: 20000,
    colorTop: [0.2, 0.3, 0.5], // Outer atmosphere (rich navy)
    colorBottom: [0.15, 0.2, 0.35], // Dim blue
  },
  {
    limit: 25000,
    colorTop: [0.1, 0.15, 0.25], // Deep space (cool indigo)
    colorBottom: [0.08, 0.1, 0.2], // Midnight blue
  },
  {
    limit: 30000,
    colorTop: [0.4, 1.0, 0.8], // Surreal zone (bright turquoise)
    colorBottom: [0.3, 0.7, 0.6], // Aqua green
  },
  {
    limit: 35000,
    colorTop: [0.9, 0.9, 0.95], // Moonlight (soft silver)
    colorBottom: [0.75, 0.75, 0.8], // Pale gray
  },
  {
    limit: Infinity,
    colorTop: [1.0, 0.7, 0.3], // Sunlight (golden orange)
    colorBottom: [0.9, 0.5, 0.2], // Warm glow
  },
];


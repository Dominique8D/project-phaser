import { EventBus } from '../EventBus';
import { EventTypes } from '../EventTypes';
import { WORLD_HEIGHT, ZONE_CONFIG } from '../utils/game-consts';

export class PlayerHeightTracker {
  private lastY: number;
  private lastZone: number = -1;

  constructor(initialY: number) {
    this.lastY = initialY;
    this.lastZone = this.getZone(initialY);
  }

  update(currentY: number) {
    this.lastY = currentY;

    const newZone = this.getZone(currentY);
    if (newZone !== this.lastZone) {
      this.lastZone = newZone;
      EventBus.emit(EventTypes.PLAYER_ZONE_CHANGED, newZone);
    }
  }

  getY(): number {
    return this.lastY;
  }

  getZone(y: number): number {
    const relativeY = WORLD_HEIGHT - y;

    for (let i = 0; i < ZONE_CONFIG.length; i++) {
      if (relativeY < ZONE_CONFIG[i].limit) {
        return i;
      }
    }

    return ZONE_CONFIG.length - 1;
  }
}


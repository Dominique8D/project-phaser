import { EventBus } from '../EventBus';
import { EventTypes } from '../EventTypes';
import { ENEMY_SPAWN_INTERVAL, WORLD_HEIGHT, ZONE_CONFIG } from '../utils/game-consts';

export class PlayerHeightTracker {
  lastY: number;
  lastZone: number = -1;
  usedSpawnPoints: Set<number> = new Set();

  constructor(initialY: number) {
    this.lastY = initialY;
    this.lastZone = this.getZone(initialY);
  }

  update(currentY: number): void {
    this.lastY = currentY;

    const newZone = this.getZone(currentY);
    if (newZone !== this.lastZone) {
      this.lastZone = newZone;
      EventBus.emit(EventTypes.ZONE_CHANGED, newZone);
    }

    this.checkSpawnPoint(currentY);
  }

  private checkSpawnPoint(y: number) {
    const relativeY = this.getRelativeY(y);
    const roundedY = Math.round(relativeY);

    if (roundedY === 0) return;

    const tolerance = 5;
    const nearestSpawnY = Math.round(roundedY / ENEMY_SPAWN_INTERVAL) * ENEMY_SPAWN_INTERVAL;
    const isCloseEnough = Math.abs(roundedY - nearestSpawnY) <= tolerance;

    if (isCloseEnough && !this.usedSpawnPoints.has(nearestSpawnY)) {
      this.usedSpawnPoints.add(nearestSpawnY);
      const zone = this.getZone(y);
      EventBus.emit(EventTypes.SPAWN_ZONE_HIT, zone);
    }
  }

  resetSpawnPoints(): void {
    this.usedSpawnPoints.clear();
  }

  getY(): number {
    return this.lastY;
  }

  getRelativeY(y: number): number {
    return WORLD_HEIGHT - y;
  }

  getZone(y: number): number {
    const relativeY = this.getRelativeY(y);
    for (let i = 0; i < ZONE_CONFIG.length; i++) {
      if (relativeY < ZONE_CONFIG[i].limit) {
        return i;
      }
    }
    return ZONE_CONFIG.length - 1;
  }
}


import Phaser from 'phaser';

export class BackgroundPipeline extends Phaser.Renderer.WebGL.Pipelines.SinglePipeline {
  private color: [number, number, number] = [1.0, 0.0, 0.0]; // default rood

  constructor(game: Phaser.Game) {
    super({
      game,
      fragShader: game.cache.shader.get('bgShader')?.fragmentSrc ?? '',
    });
  }

  onRender() {
    this.set3f('iColor', this.color[0], this.color[1], this.color[2]);
  }

  setColor(r: number, g: number, b: number) {
    this.color = [r, g, b];
  }

  fadeToColor(target: [number, number, number], duration: number = 1000) {
    const startColor = [...this.color];
    const startTime = performance.now();

    const ease = Phaser.Math.Easing.Sine.InOut;

    const step = () => {
      const now = performance.now();
      const t = Math.min((now - startTime) / duration, 1);
      const easedT = ease(t);

      const r = Phaser.Math.Linear(startColor[0], target[0], easedT);
      const g = Phaser.Math.Linear(startColor[1], target[1], easedT);
      const b = Phaser.Math.Linear(startColor[2], target[2], easedT);

      this.setColor(r, g, b);

      if (t < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }
}


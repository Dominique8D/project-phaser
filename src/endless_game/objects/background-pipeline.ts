export class BackgroundPipeline extends Phaser.Renderer.WebGL.Pipelines.SinglePipeline {
  private colorTop: [number, number, number] = [1, 0, 0];
  private colorBottom: [number, number, number] = [0, 0, 0];

  constructor(game: Phaser.Game) {
    super({
      game,
      fragShader: game.cache.shader.get('bgShader')?.fragmentSrc ?? '',
    });
  }

  onRender() {
    this.set3f('iColorTop', ...this.colorTop);
    this.set3f('iColorBottom', ...this.colorBottom);
    this.set2f('iResolution', this.game.scale.width, this.game.scale.height);
    this.set1f('iTime', performance.now() * 0.001);
  }

  setGradient(top: [number, number, number], bottom: [number, number, number]) {
    this.colorTop = top;
    this.colorBottom = bottom;
  }

  fadeToGradient(
    targetTop: [number, number, number],
    targetBottom: [number, number, number],
    duration: number = 1000,
  ) {
    const startTop = [...this.colorTop];
    const startBottom = [...this.colorBottom];
    const startTime = performance.now();
    const ease = Phaser.Math.Easing.Sine.InOut;

    const step = () => {
      const now = performance.now();
      const t = Math.min((now - startTime) / duration, 1);
      const e = ease(t);

      this.setGradient(
        [
          Phaser.Math.Linear(startTop[0], targetTop[0], e),
          Phaser.Math.Linear(startTop[1], targetTop[1], e),
          Phaser.Math.Linear(startTop[2], targetTop[2], e),
        ],
        [
          Phaser.Math.Linear(startBottom[0], targetBottom[0], e),
          Phaser.Math.Linear(startBottom[1], targetBottom[1], e),
          Phaser.Math.Linear(startBottom[2], targetBottom[2], e),
        ],
      );

      if (t < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }
}

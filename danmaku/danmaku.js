class Danmaku {
  constructor(text) {
    this.text = text || "<missing_text>";
  }

  run(line) {
    this.line = line;
    this.left = w;
    this.color = Danmaku.getColor();
    this.velocity = Math.max(this.text.length / 2, 2);
    window.requestAnimationFrame(() => this.draw());
  }

  draw() {
    this.left -= this.velocity;
    ctx.fillStyle = this.color;
    ctx.fillText(this.text, this.left, this.line * 30);
    if (this.left > -1000) {
      window.requestAnimationFrame(() => this.draw());
    }
  }

  static getColor() {
    const rnd = Math.random() * 100;
    if (rnd < 10) return "yellow";
    if (rnd < 20) return "red";
    return "white";
  }
}

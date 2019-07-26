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
    ctx.fillText(this.text, this.left, this.line * fontSize);
    if (this.left > -1000) {
      window.requestAnimationFrame(() => this.draw());
    }
  }

  static getColor() {
    const colors = [
      "#FE0302",
      "#FFD302",
      "#A0EE00",
      "#00CD00",
      "#019899",
      "#CC0273",
      "#FF7204",
      "#89D5FF",
      "#FFFF00"
    ];

    let rnd = Math.random() * 100;
    if (rnd < 80) return "white";
    rnd = Math.floor(Math.random() * colors.length);
    return colors[rnd];
  }
}

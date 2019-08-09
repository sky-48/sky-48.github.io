class Danmaku {
  constructor(text) {
    this.text = text || "<missing_text>";
  }

  run(line) {
    this.line = line;
    this.left = w;
    this.color = Danmaku.getColor();
    this.velocity = (Math.random() * this.text.length) / 2 + 2; // Math.max(this.text.length / 2, 2);
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
      "#FE0302", // red
      "#FFD302", // dark yellow
      // "#A0EE00", // light green
      // "#00CD00", // dark green
      "#019899", // teal
      "#CC0273", // magenta
      "#FF7204", // orange
      "#89D5FF", // light blue
      "#FFFF00", // yellow
    ];

    let rnd = Math.random() * 100;
    if (rnd < 80) return "white";
    rnd = Math.floor(Math.random() * colors.length);
    return colors[rnd];
  }
}

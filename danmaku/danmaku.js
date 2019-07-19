class Danmaku {
    constructor(text, delay, line, color) {
        this.text = text || "<missing_text>";
        this.color = color || "white";
        this.line = line || 1;

        this.left = w * delay / 2;

        // calculate velocity:
        this.velocity = Math.max(text.length / 2, 2);
    }

    draw(ctx) {
        if (this.left < -1000) return;
        this.left -= this.velocity;
        ctx.fillStyle = this.color;
        ctx.fillText(this.text, this.left, this.line * 30);
    }
}
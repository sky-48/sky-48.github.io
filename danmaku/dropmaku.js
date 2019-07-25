class Dropmaku {
  constructor(text) {
    this.text = text || "<missing_text>";
  }

  run(line, delay) {
    setTimeout(() => {
      const p = document.createElement("p");
      p.className = "dropmaku";
      p.innerText = this.text;
      // p.style = "top: " + 30 * line + "px";
      p.style = `top: ${30 * line}px; color: ${Dropmaku.getColor()};`;

      const container = document.getElementById("preview");
      container.appendChild(p);
      setTimeout(() => {
        container.removeChild(p);
      }, 3000);
    }, delay);
  }

  static getColor() {
    const rnd = Math.random() * 100;
    if (rnd < 10) return "yellow";
    if (rnd < 20) return "white";
    return "red";
  }
}

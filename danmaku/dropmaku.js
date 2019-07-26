class Dropmaku {
  constructor(text) {
    this.text = text || "<missing_text>";
  }

  run(line, delay) {
    setTimeout(() => {
      const p = document.createElement("p");
      p.className = "dropmaku";
      p.innerText = this.text;
      p.style = `top: ${fontSize *
        line}px; color: ${Dropmaku.getColor()}; font: ${fontStyle}`;

      const container = document.getElementById("preview");
      container.appendChild(p);
      setTimeout(() => {
        container.removeChild(p);
      }, 5000);
    }, delay);
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
      "#4266BE",
      "#FFFF00",
      "#FF0000"
    ];

    const rnd = Math.floor(Math.random() * colors.length);
    return colors[rnd];
  }
}

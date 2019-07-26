let w, h, fontSize, fontStyle, delayMean, delayVariance;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
updateCanvasSize();
updateCanvasFont();
updateDispatchDelay();

ctx.clear = function() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, w, h);
};
ctx.clear();

function updateCanvasSize() {
  const value = document.getElementById("input-canvas-size").value;
  console.log("update canvas size: " + value);
  w = value.split("*")[0];
  h = value.split("*")[1];
  const div = document.getElementById("preview");
  div.style = `width: ${w}px; height: ${h}px;`;
  canvas.width = w;
  canvas.height = h;
  ctx.font = fontStyle;
  if (ctx.clear) ctx.clear();
}

function updateCanvasFont() {
  const value = document.getElementById("input-canvas-font").value;
  fontStyle = value;
  ctx.font = fontStyle;
  fontSize = value.split("px")[0];
}

function updateDispatchDelay() {
  const value = document.getElementById("input-dispatch-delay").value;
  delayMean = value.split(",")[0];
  delayVariance = value.split(",")[1];
  if (dispatchers) {
    // reset cool down
    dispatchers.forEach(d => (d.cd = 0));
  }
}

function send(inputId) {
  const text = document.getElementById(inputId).value;
  const totalLines = Math.ceil((h / fontSize) * 0.8); // 80% of screen
  for (let line = 0; line < totalLines; line++) {
    new Dropmaku(text).run(line, line * 120 + Math.random() * 120);
  }
}
var dispatchers;
function go() {
  let texts = document
    .getElementById("input-text")
    .value.trim()
    .split("\n");

  document.getElementById("input-canvas-size").disabled = true;
  document.getElementById("input-canvas-font").disabled = true;
  document.getElementById("input-text").disabled = true;
  document.getElementById("btnGo").disabled = true;

  const totalLines = Math.floor(h / fontSize); // full screen
  dispatchers = [...Array(totalLines).keys()].map(id => new Dispatcher(id));

  window.requestAnimationFrame(clear);
  loop(dispatchers, texts);
}

function table() {
  dispatchers.sort((a, b) => a.id - b.id);
  console.table(dispatchers);
}

function loop(dispatchers, texts) {
  const text = texts[Math.floor(Math.random() * texts.length)];
  dispatchers
    .sort((a, b) => a.getCooldown() - b.getCooldown())[0]
    .dispatch(new Danmaku(text));

  const delay =
    Math.random() * (2 * delayVariance) + (delayMean - delayVariance);

  dispatchers.forEach(d => d.cooldown(delay));

  setTimeout(() => {
    loop(dispatchers, texts);
  }, delay);
}

function clear(timestamp) {
  ctx.clear();
  window.requestAnimationFrame(clear);
}

class Dispatcher {
  constructor(id) {
    this.id = id;
    this.cd = 0;
  }

  getCooldown() {
    // use ID as tie-breaker for cool down, so that when all dispatchers
    // are available, lower IDs (top of the screen) will be called first
    return this.cd + this.id;
  }

  dispatch(danmaku) {
    danmaku.run(this.id + 1);
    this.cd += danmaku.text.length * 400;
  }

  cooldown(value) {
    this.cd -= value;
    if (this.cd < 0) this.cd = 0;
  }
}

const w = 600;
const h = 400;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.font = "30px Arial";
ctx.clear = function() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, w, h);
};
ctx.clear();
var dispatchers;
const danmakus = [];
function go() {
  let texts = document
    .getElementById("input-text")
    .value.trim()
    .split("\n");

  dispatchers = [...Array(13).keys()].map(id => new Dispatcher(id));

  document.getElementById("btnGo").disabled = true;

  window.requestAnimationFrame(clear);

  loop(dispatchers, texts);
}

function loop(dispatchers, texts) {
  const text = texts[Math.floor(Math.random() * texts.length)];
  dispatchers
    .sort((a, b) => a.getCooldown() - b.getCooldown())[0]
    .dispatch(new Danmaku(text));

  const average = 50;
  const variation = 40;
  const delay = Math.random() * (2 * variation) + (average - variation);

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
    return this.cd + this.id;
  }

  dispatch(danmaku) {
    console.log(this.id + " dispatching " + danmaku.text);
    danmaku.run(this.id + 1);
    this.cd += danmaku.text.length * 400;
  }

  // todo - have a timer call this
  cooldown(value) {
    this.cd -= value;
    if (this.cd < 0) this.cd = 0;
  }
}

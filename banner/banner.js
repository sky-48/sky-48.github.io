const containerMinH = 200;

function go() {
  const el = document.getElementById("square");
  console.log(el);
  el.style["top"] = "20px";
}

[...Array(20).keys()].forEach(() => {
  const p = document.createElement("p");
  p.innerText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  document.body.appendChild(p);
});

function print(msg) {
  document.getElementById("debug").innerText = msg;
}

const container = document.getElementById("container");
const items = [
  document.getElementById("item-a"),
  document.getElementById("item-b"),
  document.getElementById("item-c"),
  document.getElementById("item-d")
];

window.requestAnimationFrame(updateBanner);

function updateBanner() {
  const containerW = container.offsetWidth;
  const containerH = container.offsetHeight;

  const percent = window.pageYOffset / (containerH - containerMinH);
  const h = containerH - window.pageYOffset;

  for (let i = 0; i < items.length; i++) {
    const top = (i * h) / 4;
    items[i].style["top"] = lerp(top, containerH - containerMinH, percent);
    items[i].style["height"] = lerp(containerH / 4, containerMinH, percent); // lerp(h / 4, h / 2, percent);
    items[i].style["width"] = lerp(containerW, containerW / 4, percent);
    items[i].style["left"] = lerp(0, (i * containerW) / 4, percent);
  }

  window.requestAnimationFrame(updateBanner);
}

function lerp(start, end, percent) {
  if (percent <= 0) return start;
  if (percent >= 1) return end;
  return (end - start) * percent + start;
}

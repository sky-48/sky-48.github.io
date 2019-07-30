const targetHeight = 100;

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
updateBanner();
window.addEventListener("scroll", updateBanner);
window.addEventListener("resize", updateBanner);

function updateBanner() {
  const percent = window.pageYOffset / (window.innerHeight - targetHeight);
  console.log(percent);
  const h = window.innerHeight - window.pageYOffset;
  console.log(`innerHeight = ${window.innerHeight}, y = ${window.pageYOffset}`);
  const container = document.getElementById("container");
  container.style["width"] = window.innerWidth;
  container.style["height"] = window.innerHeight;
  const items = [
    document.getElementById("item-a"),
    document.getElementById("item-b"),
    document.getElementById("item-c"),
    document.getElementById("item-d")
  ];

  console.log(
    `tops are: ${(0 * h) / 4 + window.pageYOffset}, ${(1 * h) / 4 +
      window.pageYOffset}, ${(2 * h) / 4 + window.pageYOffset}, ${(3 * h) / 4 +
      window.pageYOffset}`
  );
  for (let i = 0; i < items.length; i++) {
    const top = (i * h) / 4 + window.pageYOffset;
    items[i].style["top"] = top;
    items[i].style["height"] = window.innerHeight / 4; // lerp(h / 4, h / 2, percent);
    items[i].style["width"] = lerp(
      window.innerWidth,
      window.innerWidth / 4,
      percent
    );
    items[i].style["left"] = lerp(0, (i * window.innerWidth) / 4, percent);
  }
}

function lerp(start, end, percent) {
  if (percent <= 0) return start;
  if (percent >= 1) return end;
  return (end - start) * percent + start;
}

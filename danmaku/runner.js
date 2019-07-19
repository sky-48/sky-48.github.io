const w = 600, h = 400;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.font = "30px Arial";
ctx.clear = function () {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, w, h);
};
ctx.clear();

const danmakus = [];
function go() {
    document.getElementById("btnGo").disabled = true;

    for (let i = 0; i < 100; i++) {
        danmakus.push(new Danmaku("test", i, getLine(), "red"));
        danmakus.push(new Danmaku("2333333", i, getLine()));
        danmakus.push(new Danmaku("666666", i, getLine()));
        danmakus.push(new Danmaku("awsl", i, getLine(), "yellow"));
    }

    window.requestAnimationFrame(tick);
}

let line = 0;
function getLine() {
    line++;
    return (line % 10) + 1;
}

function tick(timestamp) {
    ctx.clear();
    danmakus.forEach(d => d.draw(ctx));
    window.requestAnimationFrame(tick);
}

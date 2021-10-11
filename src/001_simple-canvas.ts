const canvas: HTMLCanvasElement = <HTMLCanvasElement>(
  document.getElementById("mainCanvas")
);

var ctx = canvas.getContext("2d");
if (ctx) {
  ctx.fillStyle = "rgba(0,100,230,1)";
  ctx.fillRect(10, 10, 200, 300);
}

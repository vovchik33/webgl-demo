(function () {
  const canvas: HTMLCanvasElement = <HTMLCanvasElement>(
    document.getElementById("mainCanvas")
  );

  var gl = canvas.getContext("webgl");
  if (!gl) {
    console.log(`Error`);
    return;
  }

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
})();

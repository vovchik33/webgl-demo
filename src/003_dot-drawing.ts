import { initShaders } from "./utils";

(function () {
  // Vertex shader
  var VSHADER_SOURCE = `void main() {
    gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
    gl_PointSize = 10.0;
  }`;

  // Fragment shader
  var FSHADER_SOURCE = `void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }`;

  const canvas: HTMLCanvasElement = <HTMLCanvasElement>(
    document.getElementById("mainCanvas")
  );

  var gl = canvas.getContext("webgl");
  if (!gl) {
    console.log(`Getting Context Error`);
    return;
  }

  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log(`Initializing Shaders Error`);
    return;
  }
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.POINTS, 0, 1);
})();

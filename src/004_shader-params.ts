import { initShaders } from "./utils";

(function () {
  // Vertex shader
  var VSHADER_SOURCE = `
  attribute vec4 a_Position;
  void main() {
    gl_Position = a_Position;
    gl_PointSize = 10.0;
  }
  `;

  // Fragment shader
  var FSHADER_SOURCE = `
  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
  `;

  const canvas: HTMLCanvasElement = <HTMLCanvasElement>(
    document.getElementById("mainCanvas")
  );

  var gl = canvas.getContext("webgl");

  if (!gl) {
    console.log(`Getting Context Error`);
    return;
  }

  const program = initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
  if (!program) {
    console.log(`Initializing Shaders Error`);
    return;
  }

  var a_Position = gl.getAttribLocation(program, "a_Position");
  gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0);
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.POINTS, 0, 1);
})();

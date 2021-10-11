import { initShaders } from "./utils";

(function () {
  // Vertex shader
  var VSHADER_SOURCE = `
  attribute vec4 a_Position;
  attribute float a_Size;
  void main() {
    gl_Position = a_Position;
    gl_PointSize = a_Size;
  }
  `;

  // Fragment shader
  var FSHADER_SOURCE = `
  precision mediump float;
  uniform vec4 u_FragColor;
  void main() {
    gl_FragColor = vec4(u_FragColor);
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
  var a_Size = gl.getAttribLocation(program, "a_Size");
  var u_FragColor = gl.getUniformLocation(program, "u_FragColor");

  gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0);
  gl.vertexAttrib1f(a_Size, 20.0);
  gl.uniform4f(u_FragColor, 1.0, 0.0, 0.0, 1.0);

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.POINTS, 0, 1);
  var array = [];

  function moveCursor(e, gl, canvas, position, color, size, arr) {
    var rect = e.target.getBoundingClientRect();

    let x = (e.clientX - rect.left - canvas.width / 2) / (canvas.width / 2);
    let y = (canvas.height / 2 - (e.clientY - rect.top)) / (canvas.height / 2);

    gl.vertexAttrib3f(position, x, y, 0.0);
    gl.vertexAttrib1f(size, 20 + 5.0);
    gl.uniform4f(color, 1.0, 0.0, 0.0, 1.0);

    gl.drawArrays(gl.POINTS, 0, 1);

    for (var i = 1; i < arr.length; i++) {
      x = (arr[i][0] - rect.left - canvas.width / 2) / (canvas.width / 2);
      y = (canvas.height / 2 - (arr[i][1] - rect.top)) / (canvas.height / 2);

      gl.vertexAttrib3f(position, x, y, 0.0);
      gl.vertexAttrib1f(size, i * 0.2 + 5.0);
      gl.uniform4f(color, (1.0 / (arr.length - i)) * 5, 0.0, 0.0, 1.0);

      gl.drawArrays(gl.POINTS, 0, 1);
    }
    gl.drawArrays(gl.POINTS, 0, 1);
  }

  canvas.onmousemove = function (e) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    array.push([e.clientX, e.clientY]);

    if (array.length > 100) {
      array = array.slice(1, array.length - 1);
    }

    moveCursor(e, gl, canvas, a_Position, u_FragColor, a_Size, array);
  };
})();

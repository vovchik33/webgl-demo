export function loadShader(gl: any, type: any, source: any) {
  var shader = gl.createShader(type);
  if (shader == null) {
    console.log("unable to create shader");
    return null;
  }

  gl.shaderSource(shader, source);

  gl.compileShader(shader);

  var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!compiled) {
    var error = gl.getShaderInfoLog(shader);
    console.log("failed to compile shader: " + error);
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

export function createProgram(gl: any, vshader: any, fshader: any) {
  var vertexShader = loadShader(gl, gl.VERTEX_SHADER, vshader);
  var fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fshader);
  if (!vertexShader || !fragmentShader) {
    return null;
  }

  var program = gl.createProgram();
  if (!program) {
    return null;
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  gl.linkProgram(program);

  var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!linked) {
    var error = gl.getProgramInfoLog(program);
    console.log("failed to link program: " + error);
    gl.deleteProgram(program);
    gl.deleteShader(fragmentShader);
    gl.deleteShader(vertexShader);
    return null;
  }
  return program;
}

export function initShaders(gl: any, vshader: any, fshader: any) {
  var program = createProgram(gl, vshader, fshader);
  if (!program) {
    console.log("failed to create program");
    return undefined;
  }

  gl.useProgram(program);
  gl.program = program;

  return program;
}

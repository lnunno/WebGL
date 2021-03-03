import { initShadersTs } from "../Common/initShadersTs";
import { flatten, vec2 } from "../Common/MV-module";
import WebGLUtils from "../Common/webgl-utils-module";

let gl: WebGLRenderingContext | undefined;
let vertices;

window.onload = function init() {
  const canvas: HTMLCanvasElement = document.getElementById("gl-canvas") as HTMLCanvasElement;

  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) {
    alert("WebGL isn't available");
    return;
  }

  //  Configure WebGL
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1.0, 1.0, 1.0, 1.0);

  //  Load shaders and initialize attribute buffers
  const vertexShaderSource = `
attribute vec4 vPosition;

void main()
{
    gl_PointSize = 1.0;
    gl_Position = vPosition;
}
`;
  const fragmentShaderSource = `
precision mediump float;

void main()
{
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
`;

  const program = initShadersTs(gl, vertexShaderSource, fragmentShaderSource);
  if (program == null) {
    console.error("Problem initializing shaders and creating program");
    return null;
  }
  gl.useProgram(program);

  vertices = new Float32Array([
    0,
    0.5,
    0, // Vertice #1
    -0.5,
    -0.5,
    0, // Vertice #2
    0.5,
    -0.5,
    0, // Vertice #3
  ]);

  // Load the data into the GPU
  const bufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  // Associate our shader variables with our data buffer
  const vPosition = gl.getAttribLocation(program, "vPosition");
  gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);

  render();
};

function render() {
  if (gl == null) {
    console.error("Didn't initialize rendering context before using");
    return;
  }
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}

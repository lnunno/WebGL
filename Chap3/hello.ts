import { initShadersTs } from "../Common/initShadersTs";
import WebGLUtils from "../Common/webgl-utils-module";
import { glMatrix, vec2 } from "gl-matrix";
import { flatten } from "lodash";

// Use normal arrays and then convert to native arrays when we pass to WebGL.
glMatrix.setMatrixArrayType(Array);

let gl: WebGLRenderingContext | undefined;
let vertices: number[][];

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

  vertices = [
    vec2.fromValues(0, 0) as [number, number],
    vec2.fromValues(-1, -1) as [number, number],
    vec2.fromValues(1, -1) as [number, number],
  ];

  const inputData = flatten(vertices);
  const nativeArray = new Float32Array(inputData);

  // Load the data into the GPU
  const bufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
  gl.bufferData(gl.ARRAY_BUFFER, nativeArray, gl.STATIC_DRAW);

  // Associate our shader variables with our data buffer
  const vPosition = gl.getAttribLocation(program, "vPosition");
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);

  render();
};

function render() {
  if (gl == null) {
    console.error("Didn't initialize rendering context before using");
    return;
  }
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, vertices.length);
}

import { initShadersTs } from "../Common/initShadersTs";
import { flatten, vec2 } from "../Common/MV-module";
import WebGLUtils from "../Common/webgl-utils-module";

let gl: WebGLRenderingContext | undefined;

let theta = 0.0;
let thetaLoc: WebGLUniformLocation | null;

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
uniform float theta;

void main()
{
    float s = sin( theta );
    float c = cos( theta );

    gl_Position.x = -s * vPosition.y + c * vPosition.x;
    gl_Position.y =  s * vPosition.x + c * vPosition.y;
    gl_Position.z = 0.0;
    gl_Position.w = 1.0;
}
`;
  const fragmentShaderSource = `
precision mediump float;

void main()
{
    gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}
`;

  const program = initShadersTs(gl, vertexShaderSource, fragmentShaderSource);
  gl.useProgram(program);

  const vertices = [vec2(0, 1), vec2(-1, 0), vec2(1, 0), vec2(0, -1)];

  // Load the data into the GPU
  const bufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

  // Associate our shader variables with our data buffer
  const vPosition = gl.getAttribLocation(program!, "vPosition");
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);

  thetaLoc = gl.getUniformLocation(program!, "theta");

  render();
};

function render() {
  if (gl == null) {
    console.error("gl is null");
    return;
  }
  gl.clear(gl.COLOR_BUFFER_BIT);
  theta += 0.1;
  gl.uniform1f(thetaLoc, theta);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  window.requestAnimationFrame(render);
}

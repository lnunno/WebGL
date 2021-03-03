export function initShadersTs(
  gl: WebGLRenderingContext,
  vertexShaderSource: string,
  fragmentShaderSource: string
): WebGLProgram | null {
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  if (vertexShader == null) {
    console.error("Problem creating vertex shader");
    return null;
  }
  gl.shaderSource(vertexShader, vertexShaderSource);
  gl.compileShader(vertexShader);
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  if (fragmentShader == null) {
    console.error("Problem creating fragment shader");
    return null;
  }
  gl.shaderSource(fragmentShader, fragmentShaderSource);
  gl.compileShader(fragmentShader);
  const program = gl.createProgram();
  if (program == null) {
    console.error("Problem creating program");
    return null;
  }
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  return program;
}

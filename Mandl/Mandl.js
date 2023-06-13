function loadShader(gl, type, source) {
    const shader = gl.createShader(type);

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        let buf = gl.getShaderInfoLog(shader);
        console.log(buf);
    }

    return shader;
} 

export function initGL() {
    const canvas = document.getElementById("glCanvas");
    const gl = canvas.getContext("webgl2");

    gl.clearColor(0.514, 0.302, 0.094, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Code below you may delete for test

    const vs = `#version 300 es
        precision highp float;
        layout(location = 0) in vec4 in_pos;
        layout(location = 1) in vec4 in_color;        
        out vec4 v_color;

        void main() {
            gl_Position = in_pos;
            v_color = in_color;
        }
    `;

    const fs = `#version 300 es
        precision highp float;
        out vec4 f_color;
        in vec4 v_color;
        
        vec2 CmplAddCmpl ( vec2 A, vec2 B) 
        {        
            float n1 = 0.0;
            float n2 = 0.0;
            n1 = A.x + B.x;
            n2 = A.y + B.y;
            return vec2(n1, n2);
        }
        vec2 CmplMulCmpl(vec2 A, vec2 B) 
        {
            float n1 = 0.0;
            float n2 = 0.0;
            n1 = A.x * B.x - A.y * B.y;
            n2 = A.x * B.y + B.x * A.y;
            return vec2(n1, n2);
        }

        float CmplNorm2( vec2 A )
        {
            float n1;
            float n2;
            float n3;
            n1 = A.x * A.x;
            n2 = A.y * A.y;
            n3 = n2 + n1;
            return n3;
        }

        float Mandelbrot(vec2 var) {
            vec2 var0 = vec2(var.x, var.y);
            float n = 0.0;
            while (CmplNorm2(var) < 4.0 && n < 255.0)
            {
                var = CmplMulCmpl(var, var);
                var = CmplAddCmpl(var, var0);
                n = n + 1.0;
            }
            return n;
        }
        void main() {
            float x0 = -2.0, x1 = 2.0, y0 = -2.0, y1 = 2.0;
            vec2 z;
            float n;
            z = vec2(x0 + gl_FragCoord.x * (x1 - x0) / 1000.0, y0 + gl_FragCoord.y * (y1 - y0) / 1000.0);
            n = Mandelbrot(z);
            f_color = vec4(v_color.x * n / 255.0, v_color.y * n / 510.0, v_color.z * n / 1020.0, 1);
        }
    `;

    const vertexSh = loadShader(gl, gl.VERTEX_SHADER, vs);
    const fragmentSh = loadShader(gl, gl.FRAGMENT_SHADER, fs);

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexSh);
    gl.attachShader(shaderProgram, fragmentSh);
    gl.linkProgram(shaderProgram);

    const vBuf = gl.createBuffer();

    const dataBuf = [-1, -1, 0, 1, 1, 0, 1, 1,
                     -1, 1, 0, 1, 1, 0, 1, 1,
                      1, 1, 0, 1, 1, 0, 1, 1,
                      1, -1, 0, 1, 1, 0, 1, 1,
                      -1, -1, 0, 1, 1, 0, 1, 1];

    const render = () => {
        gl.bindBuffer(gl.ARRAY_BUFFER, vBuf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(dataBuf), gl.STATIC_DRAW);

        gl.vertexAttribPointer(0, 4, gl.FLOAT, false, 8 * 4, 0);     // pos
        gl.vertexAttribPointer(1, 4, gl.FLOAT, false, 8 * 4, 4 * 4); // color

        gl.enableVertexAttribArray(0);
        gl.enableVertexAttribArray(1);

        gl.useProgram(shaderProgram);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, dataBuf.length / 8);
        
        window.requestAnimationFrame(render);
    }

    render();
}

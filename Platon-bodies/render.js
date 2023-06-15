import { prim } from "./prim.js";
import { Camera } from "./mth.js";
import { CameraCreate } from "./mth.js";
import { vec3 } from "./mth.js";
import { mat4 } from "./mth.js"
import { MatrIdentity } from "./mth.js";
import { MatrScale } from "./mth.js";
import { MatrRotateY } from "./mth.js";
import { MatrRotateZ } from "./mth.js";
let gl;
let cam
export { gl };
 export { cam };
function loadShader(gl, type, source) {
    const shader = gl.createShader(type);

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert("Shader not compiled!")
    }

    return shader;
}

export function initGL() {
    const canvas = document.getElementById("glCanvas");
    gl = canvas.getContext("webgl2");
    //console.log(gl);
    gl.clearColor(0.514, 0.302, 0.094, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.enable(gl.DEPTH_TEST);

    // Code below you may delete for test

     const vs = `#version 300 es
         precision highp float;
         layout(location = 0) in vec3 in_pos;
         layout(location = 1) in vec4 in_color;
         uniform mat4 matrWVP;        
         out vec4 v_color;
 
         void main() {
             gl_Position = matrWVP * vec4(in_pos, 1);
             v_color = in_color;
         }
     `;
 
     const fs = `#version 300 es
         precision highp float;
         out vec4 f_color;
         in vec4 v_color;
 
         void main() {
             f_color = v_color;
         }
     `;
     
     // console.log("123");
     const vertexSh = loadShader(gl, gl.VERTEX_SHADER, vs);
     const fragmentSh = loadShader(gl, gl.FRAGMENT_SHADER, fs);
 
     const shaderProgram = gl.createProgram();
     gl.attachShader(shaderProgram, vertexSh);
     gl.attachShader(shaderProgram, fragmentSh);
     gl.linkProgram(shaderProgram);
 
     const vBuf = gl.createBuffer();
     
     let db =   [
                      0.0, 0.0, 0.0, 1.0, 1.0, 0.5, 1.0,
                      1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0,
                      1.0, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0 ,
                      0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0 ,
                      0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0 ,
                      1.0, 0.0, 1.0,  0.0, 0.0, 1.0, 1.0 ,
                      0.0, 1.0, 1.0,  0.0, 1.0, 0.0, 1.0 ,
                      1.0, 1.0, 1.0,  0.0, 1.0, 1.0, 1.0 ,
                     ];

    let dbpiramida =   [
                    0.0, -1.0, 0.0, 1.0, 1.0, 0.5, 1.0,
    
                    1.0, -1.0, 0.0, 1.0, 0.0, 1.0, 1.0,
                    1.0, -1.0, 1.0, 0.0, 0.0, 1.0, 1.0 ,
                    0.0, -1.0, 1.0, 0.0, 1.0, 1.0, 1.0 ,
                    0.5, Math.sqrt(0.5) - 1.0, 0.5, 1.0, 0.0, 0.0, 1.0 ,
                    0.5, -Math.sqrt(0.5) - 1.0, 0.5,  1.0, 0.0, 1.0, 1.0 ,
                    ];                    
          

    let ib = [
                // Top
                 0, 1, 2,
                 0, 3, 2,
                 
                 0, 3, 6, 
                 0, 4, 6, 
                 
                 4, 6, 7, 
                 4, 5, 7, 
 
                 5, 7, 2, 
                 5, 1, 2, 
 
                         
                 6, 3, 2, 
                 6, 7, 2, 
                 
                 4, 5, 0, 
                 0, 1, 5
                     
             ];
    let ibpiramida = [
                0, 1, 2,
                2, 3, 0, 

                1, 4, 2, 
                3, 4, 2, 

                3, 4, 0, 
                0, 4, 1, 

                2, 5, 1, 
                1, 5, 0, 

                3, 5, 0, 
                3, 5, 2
            ];


                
      cam = CameraCreate(gl);
      cam.resize(1000, 1000);
      cam.set(new vec3(20, 20, 30), new vec3(0, 0, 0), new vec3(0, 1, 0));
            
      //console.log("-------");
       // console.log(cam.MatrVP.a[0]);
       // console.log(cam.MatrVP.a[1]);
       // console.log("-------");
     let pr = new prim(gl.TRIANGLE_STRIP, db, 8, ib, 36, shaderProgram);
     let pr2 = new prim(gl.TRIANGLE_STRIP, dbpiramida, 6, ibpiramida, 30, shaderProgram)
     //let pr3 = new prim(gl.TRIANGLE_STRIP, dbcow, 3100, ibcow, (17412), shaderProgram)
                              
     const dataBuf = [-1, -1, 0, 1, 1, 0, 1,
         -1, 1, 0, 0, 1, 1, 1,
          Math.sqrt(3) / 2, 0, 0, 1, 0, 1, 1];
 
     const render = () => {
            pr2.draw(MatrScale(new vec3(7, 7, 7)));
            //pr2.draw(MatrScale(new vec3(7, 7, 7)).mul(MatrRotateY(Math.sin(Date.now() / 1000.0) * 100.0)));
            pr.draw(MatrScale(new vec3(7, 7, 7)).mul(MatrRotateZ(Math.sin(Date.now() / 1000000.0) * 100.0)));
 	    window.requestAnimationFrame(render);
            // pr3.draw(MatrIdentity())
     }
 
     render();
}

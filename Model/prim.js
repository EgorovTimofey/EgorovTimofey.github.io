// Egorov Timofey, 09-1, 07.06.2023, TE1

// import { vec3 } from "./mth.js";
import { gl } from "./render.js";
import { mat4 } from "./mth.js"
import { cam } from "./render.js"
import {vec3} from "./mth.js"
//

const
    vertex = "xyzrgba123",
    sizeInBytes = vertex.length * 4,
    sizeInNumbers = vertex.length;

export class prim {
    constructor(type, vData, vCnt, iData, iCnt, shaderProgram) {
        this.type = type;
        this.vData = vData;
        this.iData = iData;
    
        this.vCnt = vCnt;
        this.iCnt = iCnt;
        this.trans = new mat4(1, 0, 0, 0, 
                              0, 1, 0, 0, 
                              0, 0, 1, 0, 
                              0, 0, 0, 1);
        for (let i = 0; i < this.iCnt; i += 3)
        {
            let normal0 = new vec3();
            let normal1 = new vec3();
            let normal2 = new vec3();

            let a = this.vData[this.iData[i] * 10];
            let b  = this.vData[this.iData[i] * 10 + 1];
            let c  = this.vData[this.iData[i] * 10 + 2];
            let vec0 = new vec3(a, b, c);
    
            let a1 = this.vData[this.iData[i + 1] * 10];
            let b1  = this.vData[this.iData[i + 1] * 10 + 1];
            let c1  = this.vData[this.iData[i + 1] * 10 + 2];
            let vec1 = new vec3(a1, b1, c1);
                
            let a2 = this.vData[this.iData[i + 2] * 10];
            let b2 = this.vData[this.iData[i + 2] * 10 + 1];
            let c2 = this.vData[this.iData[i + 2] * 10 + 2];
            let vec2 = new vec3(a2, b2, c2);
                
            //console.log(vec0);
            //console.log(vec1);
            //console.log(vec2);
            let N = new vec3();
            N = ((vec1.sub(vec0)).cross(vec2.sub(vec0)));
            normal0 = (vec0.add(N)).normalize();
            normal1 = (vec1.add(N)).normalize();
            
            normal2 = (vec2.add(N)).normalize();
            /**
             * if (normal0.x < 0 || normal0.y < 0 || normal0.z < 0) {
                console.log(normal0);
            }
            */
            //console.log(normal0);
            //  console.log(normal1);
            //  console.log(normal2);

            this.vData[this.iData[i] * 10 + 7] = normal0.x;
            this.vData[this.iData[i] * 10 + 8] = normal0.y;
            this.vData[this.iData[i] * 10 + 9] = normal0.z;

            
            this.vData[this.iData[i + 1] * 10 + 7] = normal1.x;
            this.vData[this.iData[i + 1] * 10 + 8] = normal1.y;
            this.vData[this.iData[i + 1] * 10 + 9] = normal1.z;

            
            this.vData[this.iData[i + 2] * 10 + 7] = normal2.x;
            this.vData[this.iData[i + 2] * 10 + 8] = normal2.y;
            this.vData[this.iData[i + 2] * 10 + 9] = normal2.z;
                
        }

        if (vData.length != 0 && vCnt != 0) {
            // Create vertex buffer object
            this.vBuf = gl.createBuffer();
            this.vArray = gl.createVertexArray();
            gl.bindVertexArray(this.vArray);
        
            gl.bindBuffer(gl.ARRAY_BUFFER, this.vBuf);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vData), gl.STATIC_DRAW);
            // console.log(this.vData);

            gl.vertexAttribPointer(0, 3, gl.FLOAT, false, sizeInBytes, 0);  // position
            gl.vertexAttribPointer(1, 4, gl.FLOAT, false, sizeInBytes, 12); // color
            gl.vertexAttribPointer(2, 3, gl.FLOAT, false, sizeInBytes, 28); // normal

            gl.enableVertexAttribArray(0);
            gl.enableVertexAttribArray(1);
            gl.enableVertexAttribArray(2);

            gl.bindVertexArray(null);
        }

        if (iData.length != 0 && iCnt != 0) {
            // Create index buffer object
            this.iBuf = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.iBuf);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(this.iData), gl.STATIC_DRAW);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        }

        this.shader = shaderProgram;
    }

    draw(World) {
        let w = this.trans.mul(World);
        let winv = (w.inverse()).transpose();
        let wvp = w.mul(cam.MatrVP)
        // console.log("---------------------");
        // console.log(cam.MatrVP.a[0]);
        // console.log(cam.MatrVP.a[1]);
        // console.log(cam.MatrVP.a[2]);
        // console.log(cam.MatrVP.a[3]);
        // console.log("---------------------");
        //console.log(wvp.a[0]);
        //console.log(wvp.a[1]);
        //console.log(wvp.a[2]);
        //console.log(wvp.a[3]);
        //let wvp = w.mul(TE1_RndMatrVP);
        gl.useProgram(this.shader);
        const locWVP = gl.getUniformLocation(this.shader, "matrWVP");
        const locWinv = gl.getUniformLocation(this.shader, "matrWinv");
        const locW =  gl.getUniformLocation(this.shader, "matrW");
        const camLoc = gl.getUniformLocation(this.shader, "CamLoc" )
        if (locWVP != null)
            gl.uniformMatrix4fv(locWVP, false, new Float32Array(wvp.toArray()));
        if (locWVP != null)
            gl.uniformMatrix4fv(locWinv, false, new Float32Array(winv.toArray()));
        if (locW != null)
            gl.uniformMatrix4fv(locW, false, new Float32Array(w.toArray()));
        if (camLoc != null)
            gl.uniform3fv(camLoc, new Float32Array([cam.CamLoc.x, cam.CamLoc.y, cam.CamLoc.z]));
        //console.log(wvp.a[0]);
        gl.bindVertexArray(this.vArray);
        

        if (this.iCnt == 0) {
            gl.drawArrays(this.type, 0, this.vData.length / sizeInNumbers);
        }
        else {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.iBuf);
            gl.drawElements(this.type, this.iCnt, gl.UNSIGNED_INT, 0);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        }
        gl.bindVertexArray(null);
        gl.useProgram(null);
    }

    
        

    load() { 
    }
}


class marterial {
    constructor( Ka, Kd, Ks, Ph ) {
        this.Ka = Ka;
        this.Kd = Kd;
        this.Ks = Ks;
        this.Ph = Ph;
    }

}

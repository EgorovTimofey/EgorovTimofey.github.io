// Egorov Timofey, 09-1, 03.06.2023, TE1
import { gl } from "./render.js";
export class vec3{
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    add(v) {
        return new vec3(this.x + v.x, this.y + v.y, this.z + v.z);
    }
    sub(v) {
        return new vec3(this.x - v.x, this.y - v.y, this.z - v.z);
    }
    dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }
    cross(v) {
        return new vec3(this.y * v.z - this.z * v.y, 
                        this.z * v.x - this.x * v.z, 
                        this.x * v.y - this.y * v.x);
    }

    veclen2() {
        return this.dot(this);
    }

    veclen() {
        let x = this.dot(this);
        if (x == 1 || x == 0)
            return x;
        return Math.sqrt(x);
    }

    vecdivnum(number) {
        return new vec3(this.x / number, this.y / number, this.z / number);
    }

    vecNeg() {
        return new vec3 (-this.x, -this.y, -this.z); 
    }
    normalize() {
        return this.vecdivnum(this.veclen());
    }
}

export class mat4{
    constructor(a00, a01, a02, a03,
                a10, a11, a12, a13, 
                a20, a21, a22, a23, 
                a30, a31, a32, a33) {

        this.a = [
            [a00, a01, a02, a03],
            [a10, a11, a12, a13],
            [a20, a21, a22, a23],
            [a30, a31, a32, a33]
        ];            
    }
    mul(obj) {
            let r = new mat4();
            r.a[0][0] = this.a[0][0] * obj.a[0][0] + this.a[0][1] * obj.a[1][0] + 
                        this.a[0][2] * obj.a[2][0] + this.a[0][3] * obj.a[3][0];

            r.a[0][1] = this.a[0][0] * obj.a[0][1] + this.a[0][1] * obj.a[1][1] + 
                        this.a[0][2] * obj.a[2][1] + this.a[0][3] * obj.a[3][1];

            r.a[0][2] = this.a[0][0] * obj.a[0][2] + this.a[0][1] * obj.a[1][2] + 
                        this.a[0][2] * obj.a[2][2] + this.a[0][3] * obj.a[3][2];

            r.a[0][3] = this.a[0][0] * obj.a[0][3] + this.a[0][1] * obj.a[1][3] + 
                        this.a[0][2] * obj.a[2][3] + this.a[0][3] * obj.a[3][3];

            r.a[1][0] = this.a[1][0] * obj.a[0][0] + this.a[1][1] * obj.a[1][0] + 
                        this.a[1][2] * obj.a[2][0] + this.a[1][3] * obj.a[3][0];

            r.a[1][1] = this.a[1][0] * obj.a[0][1] + this.a[1][1] * obj.a[1][1] + 
                        this.a[1][2] * obj.a[2][1] + this.a[1][3] * obj.a[3][1];

            r.a[1][2] = this.a[1][0] * obj.a[0][2] + this.a[1][1] * obj.a[1][2] + 
                        this.a[1][2] * obj.a[2][2] + this.a[1][3] * obj.a[3][2];

            r.a[1][3] = this.a[1][0] * obj.a[0][3] + this.a[1][1] * obj.a[1][3] + 
                        this.a[1][2] * obj.a[2][3] + this.a[1][3] * obj.a[3][3];

            r.a[2][0] = this.a[2][0] * obj.a[0][0] + this.a[2][1] * obj.a[1][0] + 
                        this.a[2][2] * obj.a[2][0] + this.a[2][3] * obj.a[3][0];

            r.a[2][1] = this.a[2][0] * obj.a[0][1] + this.a[2][1] * obj.a[1][1] + 
                        this.a[2][2] * obj.a[2][1] + this.a[2][3] * obj.a[3][1];

            r.a[2][2] = this.a[2][0] * obj.a[0][2] + this.a[2][1] * obj.a[1][2] + 
                        this.a[2][2] * obj.a[2][2] + this.a[2][3] * obj.a[3][2];

            r.a[2][3] = this.a[2][0] * obj.a[0][3] + this.a[2][1] * obj.a[1][3] + 
                        this.a[2][2] * obj.a[2][3] + this.a[2][3] * obj.a[3][3];

            r.a[3][0] = this.a[3][0] * obj.a[0][0] + this.a[3][1] * obj.a[1][0] + 
                        this.a[3][2] * obj.a[2][0] + this.a[3][3] * obj.a[3][0];

            r.a[3][1] = this.a[3][0] * obj.a[0][1] + this.a[3][1] * obj.a[1][1] + 
                        this.a[3][2] * obj.a[2][1] + this.a[3][3] * obj.a[3][1];

            r.a[3][2] = this.a[3][0] * obj.a[0][2] + this.a[3][1] * obj.a[1][2] + 
                        this.a[3][2] * obj.a[2][2] + this.a[3][3] * obj.a[3][2];

            r.a[3][3] = this.a[3][0] * obj.a[0][3] + this.a[3][1] * obj.a[1][3] + 
                        this.a[3][2] * obj.a[2][3] + this.a[3][3] * obj.a[3][3];
            
            return r;
    }
    MatrDeterm3x3(A11, A12, A13,
              A21, A22, A23, 
              A31, A32, A33){
                    return A11 * A22 * A33 + A12 * A23 * A31 + A13 * A21 * A32 -
                           A11 * A23 * A32 - A12 * A21 * A33 - A13 * A22 * A31;
                  }
    determ(){
        return + this.a[0][0] * this.MatrDeterm3x3(this.a[1][1], this.a[1][2], this.a[1][3],
                                               this.a[2][1], this.a[2][2], this.a[2][3],
                                               this.a[3][1], this.a[3][2], this.a[3][3]) +
                - this.a[0][1] * this.MatrDeterm3x3(this.a[1][0], this.a[1][2], this.a[1][3],
                                               this.a[2][0], this.a[2][2], this.a[2][3],
                                               this.a[3][0], this.a[3][2], this.a[3][3]) +
                + this.a[0][2] * this.MatrDeterm3x3(this.a[1][0], this.a[1][1], this.a[1][3],
                                              this.a[2][0], this.a[2][1], this.a[2][3],
                                              this.a[3][0], this.a[3][1], this.a[3][3]) +
                - this.a[0][3] * this.MatrDeterm3x3(this.a[1][0], this.a[1][1], this.a[1][2],
                                               this.a[2][0], this.a[2][1], this.a[2][2],
                                               this.a[3][0], this.a[3][1], this.a[3][2]);
    }

    inverse() {
        let r = new mat4();
        let det = this.determ();
        r.a[0][0] = + this.MatrDeterm3x3(this.a[1][1], this.a[1][2], this.a[1][3],
                                    this.a[2][1], this.a[2][2], this.a[2][3],
                                    this.a[3][1], this.a[3][2], this.a[3][3]) / det;
        
        r.a[1][0] = - this.MatrDeterm3x3(this.a[1][0], this.a[1][2], this.a[1][3],
                                    this.a[2][0], this.a[2][2], this.a[2][3],
                                    this.a[3][0], this.a[3][2], this.a[3][3]) / det;

        r.a[2][0] = + this.MatrDeterm3x3(this.a[1][0], this.a[1][1], this.a[1][3],
                                    this.a[2][0], this.a[2][1], this.a[2][3],
                                    this.a[3][0], this.a[3][1], this.a[3][3]) / det;

        r.a[3][0] = - this.MatrDeterm3x3(this.a[1][0], this.a[1][1], this.a[1][2],
                                    this.a[2][0], this.a[2][1], this.a[2][2],
                                    this.a[3][0], this.a[3][1], this.a[3][2]) / det;

        r.a[0][1] = - this.MatrDeterm3x3(this.a[0][1], this.a[0][2], this.a[0][3],
                                    this.a[2][1], this.a[2][2], this.a[2][3],
                                    this.a[3][1], this.a[3][2], this.a[3][3]) / det;

        r.a[1][1] = + this.MatrDeterm3x3(this.a[0][0], this.a[0][2], this.a[0][3],
                                    this.a[2][0], this.a[2][2], this.a[2][3],
                                    this.a[3][0], this.a[3][2], this.a[3][3]) / det;

        r.a[2][1] = - this.MatrDeterm3x3(this.a[0][0], this.a[0][1], this.a[0][3],
                                    this.a[2][0], this.a[2][1], this.a[2][3],
                                    this.a[3][0], this.a[3][1], this.a[3][3]) / det;

        r.a[3][1] = + this.MatrDeterm3x3(this.a[0][0], this.a[0][1], this.a[0][2],
                                    this.a[2][0], this.a[2][1], this.a[2][2],
                                    this.a[3][0], this.a[3][1], this.a[3][2]) / det;

        r.a[0][2] = + this.MatrDeterm3x3(this.a[0][1], this.a[0][2], this.a[0][3],
                                    this.a[1][1], this.a[1][2], this.a[1][3],
                                    this.a[3][1], this.a[3][2], this.a[3][3]) / det;

        r.a[1][2] = - this.MatrDeterm3x3(this.a[0][0], this.a[0][2], this.a[0][3],
                                    this.a[1][0], this.a[1][2], this.a[1][3],
                                    this.a[3][0], this.a[3][2], this.a[3][3]) / det;

        r.a[2][2] = + this.MatrDeterm3x3(this.a[0][0], this.a[0][1], this.a[0][3],
                                    this.a[1][0], this.a[1][1], this.a[1][3],
                                    this.a[3][0], this.a[3][1], this.a[3][3]) / det;

        r.a[3][2] = - this.MatrDeterm3x3(this.a[0][0], this.a[0][1], this.a[0][2],
                                    this.a[1][0], this.a[1][1], this.a[1][2],
                                    this.a[3][0], this.a[3][1], this.a[3][2]) / det;

        r.a[0][3] = + this.MatrDeterm3x3(this.a[0][1], this.a[0][2], this.a[0][3],
                                    this.a[1][1], this.a[1][2], this.a[1][3],
                                    this.a[2][1], this.a[2][2], this.a[2][3]) / det;

        r.a[1][3] = - this.MatrDeterm3x3(this.a[0][0], this.a[0][2], this.a[0][3],
                                    this.a[1][0], this.a[1][2], this.a[1][3],
                                    this.a[2][0], this.a[2][2], this.a[2][3]) / det;

        r.a[2][3] = + this.MatrDeterm3x3(this.a[0][0], this.a[0][1], this.a[0][3],
                                    this.a[1][0], this.a[1][1], this.a[1][3],
                                    this.a[2][0], this.a[2][1], this.a[2][3]) / det;

        r.a[3][3] = - this.MatrDeterm3x3(this.a[0][0], this.a[0][1], this.a[0][2],
                                    this.a[1][0], this.a[1][1], this.a[1][2],
                                    this.a[2][0], this.a[2][1], this.a[2][2]) / det;
        return r;
            }

    transpose() {
        let r = new mat4();
        r.a[0][0] = this.a[0][0];
        r.a[0][1] = this.a[1][0];
        r.a[0][2] = this.a[2][0];
        r.a[0][3] = this.a[3][0];
      
        r.a[1][0] = this.a[0][1];
        r.a[1][1] = this.a[1][1];
        r.a[1][2] = this.a[2][1];
        r.a[1][3] = this.a[3][1];
      
        r.a[2][0] = this.a[0][2];
        r.a[2][1] = this.a[1][2];
        r.a[2][2] = this.a[2][2];
        r.a[2][3] = this.a[3][2];
      
        r.a[3][0] = this.a[0][3];
        r.a[3][1] = this.a[1][3];
        r.a[3][2] = this.a[2][3];
        r.a[3][3] = this.a[3][3];
      
        return r;
    }
    setview( Loc, At, Up1) {
        let Dir = At.sub(Loc).normalize();
        let Right = Dir.cross(Up1).normalize();
        let Up = Right.cross(Dir);
        this.a[0] = [Right.x, Up.x, -Dir.x, 0];
        this.a[1] = [Right.y, Up.y, -Dir.y, 0];
        this.a[2] = [Right.z, Up.z, -Dir.z, 0];
        this.a[3] = [Loc.dot(Right), -Loc.dot(Up), Loc.dot(Dir), 1];
        return this;
    }

    setortho(Left, Right,  Bottom, Top, Near, Far) {
        this.a[0] = [2 / (Right - Left),0, 0, 0];
        this.a[1] = [0, 2 / (Top - Bottom), 0, 0];
        this.a[2] = [0, 0, 2 / (Near - Far), 0];
        this.a[3] = [(Right + Left) / (Left - Right), (Top + Bottom) / (Bottom - Top),
                     (Far + Near) / (Near - Far), 1];
        return this;
    }

    setfrustum( l, r, b, t, n, f) {
       this.a[0] = [2 * n / (r - l), 0, 0, 0];
       this.a[1] = [0, 2 * n / (t - b), 0, 0];
       this.a[2] = [(r + l) / (r - l), (t + b) / (t - b), (f + n) / (n - f), -1];
       this.a[3] = [0, 0, 2 * n * f / (n - f), 0];   
       return this;  
    }
    toArray() {
        let r = []
        for (let i = 0; i < 4; i  += 1)
            for (let j = 0; j < 4; j += 1)
               r.push(this.a[i][j]);
        return r;
    }

}

/** 
__inline MATR MatrFrustum( FLT l, FLT r, FLT b, FLT t, FLT n, FLT f )
{
  return MatrSet(2 * n / (r - l), 0, 0, 0,
                 0, 2 * n / (t - b), 0, 0,
                 (r + l) / (r - l), (t + b) / (t - b), (f + n) / (n - f), -1,
                 0, 0, 2 * n * f / (n - f), 0);
} /* End of 'MatrFrustum' function */
export class Camera {
    constructor (gl) {
        this.gl = gl;
        
        this.ProjSize = 0.1;     /* Project plane fit square */
        this.ProjDist = 0.1;     /* Distance to project plane from viewer (near) */
        this.ProjFarClip = 300;  /* Distance to project far clip plane (far) */
      
        this.W;
        this.H;
        this.MatrView = new mat4();
        this.MatrProj = new mat4();           /* Projection coordinate system matrix */
        this.MatrVP = new mat4();             /* Stored   (View * Proj) matrix */
        
        this.CamLoc = new vec3();               /* Camera position */
        this.CamAt = new vec3();                /* Camera look-at point */
        this.CamDir = new vec3();               /* Camera forward direction */
        this.CamUp = new vec3();                /* Camera up direction */
        this.CamRight = new vec3();             /* Camera right direction */
    }
    
    set(loc, at, up) {
        this.MatrView = this.MatrView.setview(loc, at, up);
        this.MatrVP = this.MatrView.mul(this.MatrProj);
        this.CamLoc = loc;
        this.CamAt = at;
        this.CamDir = new vec3(-this.MatrView.a[0][2],
                               -this.MatrView.a[1][2],
                               -this.MatrView.a[2][2]);
        this.CamUp = new vec3(-this.MatrView.a[0][1],
                              -this.MatrView.a[1][1],
                              -this.MatrView.a[2][1]);
        this.CamRight = new vec3(-this.MatrView.a[0][0],
                                 -this.MatrView.a[1][0],
                                 -this.MatrView.a[2][0]);
    }

    resize(nW, nH) {
        this.W = nW;
        this.H = nH;
        gl.viewport(0, 0, this.W, this.H);
        this.projset();
    }

    projset() {
        let rx, ry;
        rx = ry = this.ProjSize;
        if (this.W > this.H) 
            rx *= this.W / this.H;
        else
            ry *= this.H / this.W;
        this.MatrProj = this.MatrProj.setfrustum(-rx / 2, rx / 2, -ry / 2, ry / 2,
                                                 this.ProjDist, this.ProjFarClip);
        //console.log(this.MatrProj);
        this.MatrVP = this.MatrView.mul(this.MatrProj);
    }
}


export function CameraCreate(gl) {
    return new Camera(gl);
}

export function MatrIdentity() {
    let r = new mat4();
    r.a[0][0] = 1;
    r.a[0][1] = 0;
    r.a[0][2] = 0;
    r.a[0][3] = 0;

    r.a[1][0] = 0;
    r.a[1][1] = 1;
    r.a[1][2] = 0;
    r.a[1][3] = 0;

    r.a[2][0] = 0;
    r.a[2][1] = 0;
    r.a[2][2] = 1;
    r.a[2][3] = 0;

    r.a[3][0] = 0;
    r.a[3][1] = 0;
    r.a[3][2] = 0;
    r.a[3][3] = 1;

    return r;
}


export function MatrScale(v) {
    let r = new mat4();
    r.a[0][0] = v.x;
    r.a[0][1] = 0;
    r.a[0][2] = 0;
    r.a[0][3] = 0;

    r.a[1][0] = 0;
    r.a[1][1] = v.y;
    r.a[1][2] = 0;
    r.a[1][3] = 0;

    r.a[2][0] = 0;
    r.a[2][1] = 0;
    r.a[2][2] = v.z;
    r.a[2][3] = 0;

    r.a[3][0] = 0;
    r.a[3][1] = 0;
    r.a[3][2] = 0;
    r.a[3][3] = 1;
    return r;
}


/**
 * __inline MATR MatrRotateY( FLT AngleInDegree )
{
  FLT
    A = D2R(AngleInDegree),
    si = sin(A), co = cos(A);
  MATR M = 
  {
    {
      {co, 0, -si, 0},
      {0, 1, 0, 0},
      {si, 0, co, 0},
      {0, 0, 0, 1}
    }
  };

  return M;
} /* End of 'MatrRotateY' function */

export function MatrRotateY( AngleInDegree )
{
    let a = AngleInDegree * 180.0 / Math.PI;
    let si = Math.sin(a);
    let co = Math.cos(a);
    let m = new mat4();
    m.a[0] = [co, 0, -si, 0];
    m.a[1] = [0, 1, 0, 0];
    m.a[2] = [si, 0, co, 0];
    m.a[3] = [0, 0, 0, 1];
    return m;
}

export function MatrRotateZ( AngleInDegree )
{
    let a = AngleInDegree * 180.0 / Math.PI;
    let si = Math.sin(a);
    let co = Math.cos(a);
    let m = new mat4();
    m.a[0] = [co, si, 0, 0];
    m.a[1] = [-si, co, 0, 0];
    m.a[2] = [0, 0, 1, 0];
    m.a[3] = [0, 0, 0, 1];
    return m;
}

export function MatrRotateX( AngleInDegree )
{
    let a = AngleInDegree * 180.0 / Math.PI;
    let si = Math.sin(a);
    let co = Math.cos(a);
    let m = new mat4();
    m.a[0] = [1, 0, 0, 0];
    m.a[1] = [0, co, si, 0];
    m.a[2] = [0, -si, co, 0];
    m.a[3] = [0, 0, 0, 1];
    return m;
}


export function MatrRotate( AngleInDegree, R )
{
    let a = AngleInDegree * 180.0 / Math.PI;
    let si = Math.sin(a);
    let co = Math.cos(a);
    let V = R.normalize();
    let m = new mat4();
    m[0] = [co + V.x * V.x * (1 - co), V.x * V.Y * (1 - co) + V.z * si, V.x * V.z * (1 - co) - V.Y * si, 0];
    m[1] = [V.y * V.x * (1 - co) - V.z * si, co + V.y * V.y * (1 - co), V.y * V.z * (1 - co) + V.x * si, 0];
    m[2] = [V.z * V.x * (1 - co) + V.y * si, V.z * V.y * (1 - co) - V.x * si, co + V.z * V.z * (1 - co), 0]; 
    m[3] = [0, 0, 0, 1];
    return m;
}




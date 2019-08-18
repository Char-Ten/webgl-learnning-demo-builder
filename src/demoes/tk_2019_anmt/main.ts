import * as glUtl from "webgl-dev-utils";
import createCanvas from "src/utils/createCanvas";
import loadImage from "src/utils/loadImage";
import vss from "./shaders/v.glsl";
import fss from "./shaders/f.glsl";
const canvas = createCanvas();
const process = document.createElement("input");
const gl = canvas.getContext("webgl");

const w = 400 * window.devicePixelRatio;
const h = 300 * window.devicePixelRatio;
const rectSize = 100*window.devicePixelRatio;

const program = glUtl.createProgram(gl, vss, fss);
const points = new Float32Array([
    0,0,
    rectSize,0,
    rectSize,rectSize,
    0,rectSize
]);
const bty = points.BYTES_PER_ELEMENT;
const buf = glUtl.createArrayBuffer(gl, points);
const uProcess = gl.getUniformLocation(program,'u_process');
document.body.appendChild(process);
process.style.position='fixed'
process.type = 'range';
process.step = '0.001';
process.min = '0';
process.max = '1';
process.value='0';
canvas.width=w;
canvas.height=h;

gl.useProgram(program);

process.addEventListener("input",e=>{
    let target = <HTMLInputElement>e.target;
    let value = parseFloat(target.value);
    gl.uniform1f(uProcess,value);
    gl.drawArrays(gl.POINTS, 0, 4);
});

glUtl.setProgramAttribute(gl, program, {
    a_position: {
        type: "pointer",
        value: [2, gl.FLOAT, false, 0, 0]
    }
});

glUtl.setProgramUniform(gl, program, {
    u_resolution: {
        type: "float",
        value: [w, h]
    },
    u_process:{
        type:"float",
        value:[0],
    },
    u_size:{
        type:"float",
        value:[rectSize/2]
    }
});

gl.viewport(0, 0, w, h);
gl.drawArrays(gl.POINTS, 0, 4);


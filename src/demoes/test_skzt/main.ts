import * as glUtl from "webgl-dev-utils";
import createCanvas from "src/utils/createCanvas";
import loadImage from "src/utils/loadImage";
import vss from "./shaders/v.glsl";
import fss from "./shaders/f.glsl";
import banner from "./img/bg.jpg";
import mask from './img/mask.jpg';
const canvas = createCanvas();
const gl = canvas.getContext("webgl");

const w = window.innerWidth * window.devicePixelRatio;
const h = window.innerHeight * window.devicePixelRatio;
const program = glUtl.createProgram(gl, vss, fss);
const points = new Float32Array([0, 0, 0, h, w, h, w, 0]);
const buf = glUtl.createArrayBuffer(gl, points);
const textures = {
	banner: gl.createTexture(),
	mask:gl.createTexture(),
};
canvas.style.width = window.innerWidth+'px';
canvas.width = w;
canvas.height = h;
Promise.all([
	loadImage(banner),
	loadImage(mask),
]).then(([
	bannerImage,
	maskImage
]) => {
	gl.useProgram(program);
	glUtl.updateTexture(gl, gl.TEXTURE0, textures.banner, bannerImage);
	glUtl.updateTexture(gl,gl.TEXTURE1, textures.mask, maskImage)
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
        u_tex1_size:{
            type:'float',
            value:[bannerImage.width,bannerImage.height]
		},
		u_tex1: {
			type: "int",
			value: [0]
		},
		u_tex2:{
			type: "int",
			value: [1]
		},
        u_time:{
            type:'float',
            value:[0]
        }
	});

	gl.viewport(0, 0, w, h);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    requestAnimationFrame(run);
});

let lastTime = Date.now();
function run():void{
    let now = Date.now();
    if(now-lastTime<1000/30){
        requestAnimationFrame(run);
        return
    }
	lastTime=now;
	let time = lastTime%60001;
    glUtl.setProgramUniform(gl,program,{
        u_time:{
            type:'float',
            value:[time*0.0001]
        }
    });
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    requestAnimationFrame(run);
}

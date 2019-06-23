declare module "webgl-dev-utils" {
	interface WebGLProgramParam {
		[attributeName: string]: {
			type: string;
			value: number[] | WebGLBufferReader;
		};
	}
	interface WebGLBufferReader {
		0: number;
		1: number;
		2: boolean;
		3: number;
		4: number;
	}
	export function createProgram(
		gl: WebGLRenderingContext,
		vertexSource: string,
		fragmentSource: string
	): WebGLProgram;

	export function createShader(
		gl: WebGLRenderingContext,
		program: WebGLProgram,
		source: string,
		type: number
	): WebGLShader;

	export function createArrayBuffer(
		gl: WebGLRenderingContext,
		data: ArrayBuffer,
		usage?: number
	): WebGLBuffer;

	export function createTextureByImage(
		gl: WebGLRenderingContext,
		image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement
	): WebGLTexture;

	export function updateTexture(
		gl: WebGLRenderingContext,
		index: number,
		texture: WebGLTexture,

		image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement
	): WebGLTexture;

	export function checkTexture(
		gl: WebGLRenderingContext,
		texture: WebGLTexture,
		width: number,
		height: number
	): WebGLTexture;

	export function setProgramAttribute(
		gl: WebGLRenderingContext,
		program: WebGLProgram,
		data: WebGLProgramParam
	): void;

	export function setProgramUniform(
		gl: WebGLRenderingContext,
		program: WebGLProgram,
		data: WebGLProgramParam
	): void;
}

declare module "*.glsl" {
	const glsl: string;
	export default glsl;
}

declare module "*.jpg";

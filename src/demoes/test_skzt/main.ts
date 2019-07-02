import mobile from 'src/utils/mobile';
import createCanvas from "src/utils/createCanvas";
import loadImage from "src/utils/loadImage";
mobile();

const canvas = createCanvas();
canvas.style.width = `${window.innerWidth}px`;
canvas.style.height = `${window.innerHeight}px`;
canvas.width = window.devicePixelRatio*window.innerWidth;
canvas.height = window.devicePixelRatio*window.innerHeight;
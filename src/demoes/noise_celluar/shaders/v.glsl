precision mediump float;
attribute vec2 a_position;
uniform vec2 u_resolution;
varying vec2 v_position;

void main(){
    vec2 st = 2.*a_position/u_resolution;
    v_position=st;
    gl_Position=vec4((st-1.)*vec2(1,-1),0.0,1.0);
}
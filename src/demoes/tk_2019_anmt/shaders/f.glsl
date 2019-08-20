precision mediump float;
uniform vec2 u_resolution;
uniform float u_process;
varying vec2 v_position;
#define PI 3.1415926
void main(){

    gl_FragColor = vec4(
        vec3(1.,u_process,0.),
        2.-distance(gl_PointCoord,vec2(.5))*sin(u_process*PI)
    );
}
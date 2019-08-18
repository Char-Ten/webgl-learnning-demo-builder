precision mediump float;
uniform vec2 u_resolution;
uniform float u_process;
varying vec2 v_position;

void main(){

    gl_FragColor = vec4(
        vec3(1.,u_process,0.),
        1.-distance(gl_PointCoord,vec2(.5))
    );
}
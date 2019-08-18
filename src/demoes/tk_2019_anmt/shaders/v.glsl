precision mediump float;
attribute vec2 a_position;
uniform vec2 u_resolution;
uniform float u_process;
uniform float u_size;
varying vec2 v_position;
#define PI 3.1415926
void main(){
    vec2 st = a_position/u_resolution;
    st*=sin(u_process*PI)+1.;
    if(u_process>0.5){
        st.x+=.5*(u_process-.5)/.5;
    }
    v_position = st;
    gl_PointSize = u_size;
    gl_Position = vec4(st,0.,1.);
}
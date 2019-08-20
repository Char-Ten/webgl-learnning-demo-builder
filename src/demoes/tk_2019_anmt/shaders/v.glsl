precision mediump float;
attribute vec2 a_position;
uniform vec2 u_resolution;
uniform float u_process;
uniform float u_size;
varying vec2 v_position;
#define PI 3.1415926
vec2 random(vec2 p){
    return -1.0 + 2.0 * fract(
		sin(
			vec2(
				dot(p, vec2(127.1,311.7)),
				dot(p, vec2(269.5,183.3))
			)
		) * u_process
	);
}
void main(){
    vec2 st = a_position/u_resolution;
    st-=0.5;
    st*=vec2(1.,-1.);
    st*=sin(u_process*PI)*random(st)+1.;
    if(u_process>0.5){
        st.x+=.5*(u_process-.5)/.5;
    }
    
    v_position = st;
    gl_PointSize = u_size-5.*sin(u_process*PI);
    gl_Position = vec4(st,0.,1.);
}
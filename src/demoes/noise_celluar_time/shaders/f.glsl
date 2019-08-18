precision mediump float;
uniform vec2 u_resolution;
uniform vec2 u_tex1_size;
uniform float u_time;
uniform sampler2D u_tex1;
varying vec2 v_position;

vec3 random(vec3 p){
	return fract(
		sin(
			vec3(
				dot(p,vec3(127.1,311.7,1.)),
				dot(p,vec3(269.5,183.3,1.)),
				dot(p,vec3(247.3,108.5,96.5))
			)
		)*43758.5453
	);
}

float noise_celluar(vec3 p){
	vec3 i=floor(p);//获取当前网格索引i
	vec3 f=fract(p);//获取当前片元在网格内的相对位置
	float F1=1.;
	for(int j=-1;j<=1;j++){
		for(int k=-1;k<=1;k++){
			for(int l=-1;l<=1;l++){
				vec3 neighbor=vec3(float(j),float(k),float(l));//周围格子向量
				vec3 point=random(i+neighbor);
				float d=length(point+neighbor-f);
				F1=min(F1,d);
			}
			
		}
	}
	return F1;
}



void main(){
	vec2 st=v_position;
	vec3 color=vec3(
		noise_celluar(vec3(st*2.,0.)+u_time*.5)
	);
	vec2 offset=(vec2(5.))*10./u_tex1_size;
	vec4 tex1_color=texture2D(u_tex1,st);
	gl_FragColor = vec4(color,1.);
}
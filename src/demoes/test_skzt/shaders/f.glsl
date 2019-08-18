precision mediump float;
uniform vec2 u_resolution;
uniform vec2 u_tex1_size;
uniform float u_time;
uniform sampler2D u_tex1;
uniform sampler2D u_tex2;
varying vec2 v_position;
#define OCTAVE_NUM 3
#define PI 3.1415926
vec2 random(vec2 p){
	return-1.+2.*fract(
		sin(
			vec2(
				dot(p,vec2(127.1,311.7)),
				dot(p,vec2(269.5,183.3))
			)
		)*123.321
	);
}

float noise_perlin(vec2 p){
	vec2 i=floor(p);// 获取当前网格索引i
	vec2 f=fract(p);// 获取当前片元在网格内的相对位置
	// 计算梯度贡献值
	float a=dot((random(i)),f);// 梯度向量与距离向量点积运算
	float b=dot(random(i+vec2(1.,0.)),f-vec2(1.,0.));
	float c=dot(random(i+vec2(0.,1.)),f-vec2(0.,1.));
	float d=dot(random(i+vec2(1.,1.)),f-vec2(1.,1.));
	// 平滑插值
	vec2 u=smoothstep(0.,1.,f);
	// 叠加四个梯度贡献值
	return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
	
}

mat2 rotate(float d){
	return mat2(
		cos(d),-sin(d),
		sin(d),cos(d)
	);
}

float fbm(vec2 p){
	float f=noise_perlin(p);
	for(float j=1.;j<float(OCTAVE_NUM);j+=1.){
		f+=noise_perlin(2.*j*p)/j/2.;
	}
	return f;
}

void main(){
	vec2 st=v_position;
	float len=distance(st,vec2(.5));
	float t=u_time*2.*PI;
	lowp vec3 color=vec3(
		fbm(
			(st)*10.*rotate(t)
		)
	);
	color+=.5;
	color=smoothstep(.0,1.,color);
	vec2 offset=(st-5.)*2./u_tex1_size;
	vec4 tex2_color=texture2D(u_tex2,st);
	vec4 tex1_color=texture2D(u_tex1,st);
	
	color*=tex2_color.r;
	
	vec4 offset_color=(texture2D(u_tex1,st+offset*color.r)-vec4(.5))*50.+vec4(.5);
	offset_color.a=1.;
	offset_color*=color.r;
	tex1_color+=vec4((offset_color.rgb-.2)*(tex2_color.r-.1),0.);
	tex1_color+=vec4(color+1.*tex2_color.r,0.);
	gl_FragColor=tex1_color;
	// gl_FragColor=vec4(color,1.);
}
precision mediump float;
uniform vec2 u_resolution;
uniform vec2 u_tex1_size;
uniform float u_time;
uniform sampler2D u_tex1;
varying vec2 v_position;

vec2 random(vec2 p){
    return -1.0 + 2.0 * fract(
		sin(
			vec2(
				dot(p, vec2(127.1,311.7)),
				dot(p, vec2(269.5,183.3))
			)
		) * 43758.5453
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

void main(){
    vec2 st=v_position;
    vec3 color=vec3(
       noise_perlin(st*30.+u_time)
    );
    vec2 offset = (st-vec2(5.))/u_tex1_size;
    vec4 tex1_color = texture2D(u_tex1,st+color.r*offset);

    gl_FragColor=tex1_color;
}
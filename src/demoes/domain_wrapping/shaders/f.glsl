precision mediump float;
uniform vec2 u_resolution;
uniform vec2 u_tex1_size;
uniform float u_time;
uniform sampler2D u_tex1;
varying vec2 v_position;

vec3 random(vec3 p){
    return-1.+2.*fract(
        sin(
            vec3(
                dot(p,vec3(127.1,311.7,1.)),
                dot(p,vec3(269.5,183.3,1.)),
                dot(p,vec3(247.3,108.5,96.5))
            )
        )*43758.5453
    );
}

float noise_perlin(vec3 p){
    vec3 i=floor(p);// 获取当前网格索引i
    vec3 f=fract(p);// 获取当前片元在网格内的相对位置
    // 计算梯度贡献值
    float ftl=dot(random(i+vec3(0.,0.,0.)),f-vec3(0.,0.,0.));
    float ftr=dot(random(i+vec3(1.,0.,0.)),f-vec3(1.,0.,0.));
    float fbl=dot(random(i+vec3(0.,1.,0.)),f-vec3(0.,1.,0.));
    float fbr=dot(random(i+vec3(1.,1.,0.)),f-vec3(1.,1.,0.));
    float ctl=dot(random(i+vec3(0.,0.,1.)),f-vec3(0.,0.,1.));
    float ctr=dot(random(i+vec3(1.,0.,1.)),f-vec3(1.,0.,1.));
    float cbl=dot(random(i+vec3(0.,1.,1.)),f-vec3(0.,1.,1.));
    float cbr=dot(random(i+vec3(1.,1.,1.)),f-vec3(1.,1.,1.));
    // 平滑插值
    vec3 u=smoothstep(0.,1.,f);
    // 叠加四个梯度贡献值
    return mix(
        mix(
            mix(
                ftl,
                ftr,
                u.x
            ),
            mix(
                fbl,
                fbr,
                u.x
            ),
        u.y),
        mix(
            mix(
                ctl,
                ctr,
                u.x
            ),
            mix(
                cbl,
                cbr,
                u.x
            ),
        u.y),
    u.z);
}
float fbm_time(vec3 p){
	float f=noise_perlin(p);
	for(int i=0;i<1;i++){
		float j=2.*float(i+1);
		f+=noise_perlin(p*j)/j;
	};
	return f;
}

mat3 rotate(float a){
	return mat3(
		cos(a),-sin(a),0,
		sin(a),cos(a),0,
		0,0,1
	);
}
mat3 scale(float s){
	return mat3(
		1,0,0,
		0,1,0,
		s,s,1
	);
}

void main(){
	vec2 st=v_position;
	vec3 p=vec3((st-.5)*10.,1.)*rotate(.2*u_time)*scale(sin(u_time))-vec3(u_time,0.2*sin(u_time),u_time);
	vec3 color=vec3(
		fbm_time(
			p+fbm_time(
				p+fbm_time(p)
			)
		)
	);
	color = smoothstep(.0, 1.,color);
	vec2 offset=(vec2(.5))*115./u_tex1_size;
	vec4 tex1_color=texture2D(u_tex1,st+offset*color.r);
	// gl_FragColor=mix(
	// 	tex1_color,
	// 	vec4(
	// 		tex1_color.rgb*.2,
	// 		1.
	// 	),
	// 	(1.-color.r)
	// )+vec4(color,0.);
	gl_FragColor=vec4(color,1.);
}
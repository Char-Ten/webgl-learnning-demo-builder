precision mediump float;
uniform vec2 u_resolution;
uniform vec2 u_tex1_size;
uniform float u_time;
uniform sampler2D u_tex1;
varying vec2 v_position;

vec2 random(vec2 p){
    return-1.+2.*fract(
        sin(
            vec2(
                dot(p,vec2(127.1,311.7)),
                dot(p,vec2(269.5,183.3))
            )
        )*43758.5453
    );
}

float noise_celluar(vec2 p){
    vec2 i=floor(p);//获取当前网格索引i
    vec2 f=fract(p);//获取当前片元在网格内的相对位置
    float F1=1.;
    for(int j=-1;j<=1;j++){
        for(int k=-1;k<=1;k++){
            vec2 neighbor=vec2(float(j),float(k));//周围格子向量
            vec2 point=(random(i+neighbor)+1.)/2.;
            float d=length(point+neighbor-f);
            F1=min(F1,d);
        }
    }
    return F1;
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

float noise_fbm(vec2 p){
    float f = 0.;
    f+=noise_perlin(p);
    f+=.5*noise_perlin(2.*p);
    f+=.25*noise_celluar(4.*p);
    f+=.25/2.*noise_celluar(4.*2.*p);
    return f;
}
/* Math 2D Transformations */
mat2 rotate2d(float angle){
    return mat2(cos(angle),-sin(angle), sin(angle), cos(angle));
}
void main(){
    vec2 st=v_position;
    vec3 color=vec3(
        noise_fbm(st*5.*rotate2d(u_time*0.1))
    );
    vec2 offset=(st-vec2(5.))/u_tex1_size;
    vec4 tex1_color=texture2D(u_tex1,st+offset*color.r);
    vec3 shadow_color = vec3(0.0,.1,.5)+color.r;
    
    gl_FragColor=tex1_color+vec4(shadow_color,.1)*color.r;
    // gl_FragColor=vec4(color,1.);
}
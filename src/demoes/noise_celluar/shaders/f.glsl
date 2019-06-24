precision mediump float;
uniform vec2 u_resolution;
uniform vec2 u_tex1_size;
uniform float u_time;
uniform sampler2D u_tex1;
varying vec2 v_position;

vec2 random(vec2 p){
    return fract(
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
            vec2 point=random(i+neighbor);
            float d=length(point+neighbor-f);
            F1=min(F1,d);
        }
    }
    return F1;
}

void main(){
    vec2 st=v_position;
    vec3 color=vec3(
        noise_celluar(st*10.+u_time)
    );
    vec2 offset=(vec2(5.))*10./u_tex1_size;
    vec4 tex1_color=texture2D(u_tex1,st+(color.r)*offset);
    tex1_color+=vec4(.5,.8,.9,0.)*color.r*.5;
    tex1_color=mix(
        texture2D(u_tex1,st),
        tex1_color,
        color.g
    );
    gl_FragColor=tex1_color;
}
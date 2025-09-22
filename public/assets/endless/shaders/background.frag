precision mediump float;

uniform vec3 iColorTop;
uniform vec3 iColorBottom;
uniform vec2 iResolution;

void main(void) {
    float t = gl_FragCoord.y / iResolution.y;
    vec3 color = mix(iColorBottom, iColorTop, t);
    gl_FragColor = vec4(color, 1.0);
}

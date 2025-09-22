precision mediump float;

uniform vec3 iColor;

void main(void) {
    gl_FragColor = vec4(iColor, 1.0);
}

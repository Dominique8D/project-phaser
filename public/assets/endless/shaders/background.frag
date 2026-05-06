precision mediump float;

uniform vec3 iColorTop;
uniform vec3 iColorBottom;
uniform vec2 iResolution;
uniform float iTime;

const float CLOUD_SCALE = 3.0;
const float CLOUD_SPEED = 0.015;
const float CLOUD_LIFETIME = 18.0;
const float CLOUD_FADE_START = 0.55;
const float CLOUD_OPACITY = 0.8;

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x)
         + (c - a) * u.y * (1.0 - u.x)
         + (d - b) * u.x * u.y;
}

float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
        v += a * noise(p);
        p *= 2.0;
        a *= 0.5;
    }
    return v;
}

void main(void) {
    vec2 uv = gl_FragCoord.xy / iResolution.xy;

    float t = uv.y;
    vec3 bg = mix(iColorBottom, iColorTop, t);

    vec2 cloudUV = uv * CLOUD_SCALE;
    cloudUV.x += iTime * CLOUD_SPEED;

    float cycle = floor(iTime / CLOUD_LIFETIME);
    cloudUV += vec2(hash(vec2(cycle, 0.0)), hash(vec2(0.0, cycle))) * 10.0;

    float cloud = fbm(cloudUV);
    cloud = smoothstep(0.45, 0.85, cloud);

    float life = fract(iTime / CLOUD_LIFETIME);
    float cloudFade = 1.0 - smoothstep(CLOUD_FADE_START, 1.0, life);

    float bgLuma = dot(bg, vec3(0.299, 0.587, 0.114));
    vec3 cloudColor = mix(vec3(1.0), vec3(0.85), smoothstep(0.75, 1.0, bgLuma));

    vec3 finalColor = mix(bg, cloudColor, cloud * CLOUD_OPACITY * cloudFade);

    gl_FragColor = vec4(finalColor, 1.0);
}

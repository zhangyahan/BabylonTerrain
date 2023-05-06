#ifdef GL_ES
precision highp float;
#endif

varying vec2 vPosition;
varying vec2 vUV;
uniform sampler2D source;
uniform vec2 viewport;
uniform float scaleFactor;

float getHeight(float s, float t) {
	vec2 coord = vUV + vec2(s, t) / viewport;
	vec4 texel = texture2D(source, coord);
	float height = (((texel.r*256.0 + texel.g) / 257.0) - 0.5)*scaleFactor;
	return height;
}

// 该片段着色器的工作是：
// 根据不同贴图获取获取当前UV像素的颜色高度然后计算当前颜色值
void main() {
	float height = getHeight(0.0, 0.0);
	float left = getHeight(-1.0, 0.0);
	float right = getHeight(1.0, 0.0);
	float bottom = getHeight(0.0, -1.0);
	float top = getHeight(0.0, 1.0);
	float dS = (right - left)*0.5;
	float dT = (top - bottom)*0.5;
	gl_FragColor = vec4(height, dS*viewport.s, dT*viewport.t, 1);
}
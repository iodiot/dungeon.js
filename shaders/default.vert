attribute vec4 tangent;

varying vec3 vTint;
varying vec2 vUv;
varying vec3 vPosition;

varying vec3 tsPosition;
varying vec3 tsCameraPosition;

varying mat3 tbn;

void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

	vTint = color;
	vUv = uv;
	vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;

	vec3 vNormal = normalize((modelViewMatrix * vec4(normal, 0.0)).xyz);
	vec3 vTangent = normalize((modelViewMatrix * vec4(tangent.xyz, 0.0)).xyz);
	vec3 vBinormal = normalize(cross(vTangent, vNormal) * tangent.w);

	tbn = mat3(vTangent, vBinormal, vNormal);

	tsPosition = vPosition * tbn;
	tsCameraPosition = (viewMatrix * vec4(cameraPosition, 1.0)).xyz * tbn;
}

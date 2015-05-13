const int MAX_LIGHTS = 6;
	
uniform sampler2D texture;
uniform sampler2D normalMap;

uniform vec3 lightColors[MAX_LIGHTS];
uniform vec3 lightPositions[MAX_LIGHTS];

varying vec3 vTint;
varying vec2 vUv;
varying vec3 vPosition;

varying vec3 tsPosition;
varying vec3 tsCameraPosition;
varying mat3 tbn;

float calcDirectDiffuse(vec3 lightVector, vec3 normal)
{
	normal.g = -normal.b;
	normal.b = 1.0;

	return max(dot(normal, lightVector), 0.0);
}

float caclBackDiffuse(vec3 lightVector, vec3 normal)
{
	if (normal.g < 0.01) { return 0.0; }

	normal.g = -normal.b;
	normal.b = -1.0;

	return max(dot(normal, lightVector), 0.0);
}

float calcFogAmount()
{
	float fogStart = 5.0;
	float fogEnd = 80.0;
	float fogDistance = gl_FragCoord.z / gl_FragCoord.w - 8.0;
	float fogAmount = (fogDistance - fogStart) / (fogEnd - fogStart);
	return 1.0 - (1.0 - fogAmount) * (1.0 - fogAmount) * (1.0 - fogAmount);
}

vec3 calcLighting(vec3 rgb, vec3 normal)
{
	vec3 result = 1.0 * rgb;

	for (int i = 0; i < MAX_LIGHTS; ++i) {
		vec3 tsLightPosition = (viewMatrix * vec4(lightPositions[i], 1.0)).xyz * tbn;

		vec3 lightVector = normalize(tsLightPosition - tsPosition);

		float dotDir = calcDirectDiffuse(lightVector, normal);
		float dotBack = caclBackDiffuse(lightVector, normal);

		float distanceToLight = dot(tsLightPosition - tsPosition, tsLightPosition - tsPosition);
		float fadeCoef = exp(-distanceToLight * 0.005);

		vec3 subResult = 1.7 * max(rgb * lightColors[i] * dotDir * fadeCoef, 0.5 * lightColors[i] * dotBack * fadeCoef);
		
		result = clamp(1.0 - (1.0 - subResult) * (1.0 - result), 0.0, 1.0);
	}

	return result;
}

void main() 
{
	if (texture2D(texture, vUv).a < 0.01) { discard; }

	// 
	float height = texture2D(normalMap, vUv).a;
	float v = height * 0.001 - 0.001;								// TODO: magic number!
	vec3 eye = normalize(tsCameraPosition);
	vec2 newCoords = vUv + (eye.xy * v);
	vec4 texel = texture2D(texture, newCoords); 
	
	vec3 normal = texture2D(normalMap, newCoords).rgb;

	// // glowing texel
	// if (normal.g > 0.9) {
	// 	gl_FragColor = texel;
	// 	return;
	// }
	
	normal = normal * 2.0 - 1.0;

	vec3 rgb = calcLighting(texel.rgb, normal);
	vec3 rgbInFog = mix(rgb, vec3(0.094, 0.105, 0.129), clamp(calcFogAmount(), 0.0, 1.0));

	vec4 result = vec4(rgbInFog * vTint, texel.a);
	gl_FragColor = result;
}
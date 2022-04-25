uniform vec3 colorA;
uniform vec3 colorB;
uniform vec3 contourColorA;
uniform vec3 contourColorB;
uniform float maximumElevation;
uniform float contourInterval;
uniform float contourThickness;
varying vec3 vUv;

float modulo(float a, float b ) {
    return a - (b * floor(a/b));
}

void main() {
    float m = modulo(vUv.z, contourInterval);
    if (vUv.z > (contourInterval - 1.0) && m >= 0.0 && m < contourThickness) {
        gl_FragColor = vec4(mix(contourColorA, contourColorB, vUv.z / maximumElevation), 1.0);
    } else if (vUv.z < 0.1) {
        gl_FragColor = vec4(mix(colorA, colorB, vUv.z / maximumElevation), 0.98);
    } else {
        gl_FragColor = vec4(mix(colorA, colorB, vUv.z / maximumElevation), 1.0);
    }
}


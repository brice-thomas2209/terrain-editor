import { Color, IUniform, Material, Mesh, PlaneBufferGeometry, ShaderMaterial } from 'three';
// @ts-ignore
import vertexShader from '../../shaders/terrainVertexShader.glsl';
// @ts-ignore
import fragmentShader from '../../shaders/terrainFragmentShader.glsl';

export const createPlaneMaterial = (): ShaderMaterial => {
  return new ShaderMaterial({
    uniforms: {
      colorB: { type: 'vec3', value: new Color(0x2a4858) } as IUniform,
      colorA: { type: 'vec3', value: new Color(0xa5c2d1) } as IUniform,
      contourColorB: { type: 'vec3', value: new Color(0xffffff) } as IUniform,
      contourColorA: { type: 'vec3', value: new Color(0x000000) } as IUniform,
      contourInterval: { type: 'float', value: 5.0 } as IUniform,
      contourThickness: { type: 'float', value: 0.1 } as IUniform,
      maximumElevation: { type: 'float', value: 20.0 } as IUniform
    },
    fragmentShader: fragmentShader,
    vertexShader: vertexShader,
    wireframe: false
  });
};

export const createPlane = (width: number, height: number, material: Material): Mesh => {
  const geometry = new PlaneBufferGeometry(width, height, 400, 400);

  const plane = new Mesh(geometry, material);
  plane.receiveShadow = true;
  plane.castShadow = true;
  plane.rotation.x = -Math.PI / 3;
  // plane.position.z = 0;
  return plane;
};

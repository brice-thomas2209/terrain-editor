import { SpotLight } from 'three';

export const createSpotLight = () => {
  const spotLight = new SpotLight(0xffffff);
  spotLight.position.set(70, 10, 100);

  spotLight.castShadow = true;

  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;

  spotLight.shadow.camera.near = 500;
  spotLight.shadow.camera.far = 4000;
  spotLight.shadow.camera.fov = 30;

  return spotLight;
};

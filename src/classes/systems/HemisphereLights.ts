import { HemisphereLight } from 'three';

export const createHemisphereLight = (): HemisphereLight => {
  const hemisphereLight = new HemisphereLight(0xffffbb, 0x080820, 1);
  hemisphereLight.position.set(100, 100, 300);
  return hemisphereLight;
};

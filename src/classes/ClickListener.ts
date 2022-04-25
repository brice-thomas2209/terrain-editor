import { Camera, MathUtils, Mesh, Raycaster, Scene, Vector2, Vector3 } from 'three';
import { world } from './WorldInstance';
import { GuiStore } from './DatGuiInstance';
import { ElevationCursor } from '../constants/ElevationCursor';
import { Cursor } from '../constants/Cursor';

let mouseDown = false;
const raycaster = new Raycaster();
const clickMouse = new Vector2();
const v = new Vector3();

export const createClickListener = (camera: Camera, scene: Scene) => {
  if (typeof window !== 'undefined') {
    // window.addEventListener('keydown', (event) => (world.orbitControl.enabled = !event.shiftKey));
    // window.addEventListener('keyup', () => (world.orbitControl.enabled = true));
    window.addEventListener('mousedown', () => (mouseDown = true));
    window.addEventListener('mouseup', () => (mouseDown = false));
    window.addEventListener('mousemove', (e) => onMouseMove(e, camera, scene));
  }
};

const onMouseMove = (event: MouseEvent, camera: Camera, scene: Scene) => {
  if (!mouseDown || typeof window === 'undefined') return;

  clickMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  clickMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(clickMouse, camera);
  const found = raycaster.intersectObjects(scene.children);
  let maxHeight = 0;
  if (found.length > 0 && (found[0].object as Mesh).geometry) {
    const mesh = found[0].object as Mesh;
    const geometry = mesh.geometry;
    const point = found[0].point;
    for (let i = 0; i < geometry.attributes.position.count; i++) {
      v.set(
        geometry.attributes.position.getX(i),
        geometry.attributes.position.getY(i),
        geometry.attributes.position.getZ(i)
      );
      const toWorld = mesh.localToWorld(v);
      const distance = point.distanceTo(toWorld);
      let height = geometry.attributes.position.getZ(i);
      if (distance < Cursor.MAX_CLICK_DISTANCE) {
        const z = geometry.attributes.position.getZ(i);
        const moveDelta =
          (Cursor.MAX_CLICK_DISTANCE - distance) *
          (GuiStore.cursor === ElevationCursor.ADD ? 1 : -1);
        height = MathUtils.lerp(z, Math.max(0, z + moveDelta), 0.25);
        geometry.attributes.position.setZ(i, height);
      }
      if (height > maxHeight) {
        maxHeight = height;
      }
    }
    geometry.computeVertexNormals();
    geometry.attributes.position.needsUpdate = true;
    if (maxHeight) {
      world.material.uniforms.maximumElevation.value = maxHeight;
    }
  }
};

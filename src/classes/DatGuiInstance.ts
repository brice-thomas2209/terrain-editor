import { GUI } from 'dat.gui';
import { World } from './World';
import { Color } from 'three';
import { ElevationCursor } from '../constants/ElevationCursor';
import { Cursor } from '../constants/Cursor';

export let gui: GUI;

export interface IGuiStore {
  colorA?: number;
  colorB?: number;
  cursor: ElevationCursor;
}

export const GuiStore: IGuiStore = {
  cursor: ElevationCursor.ADD
};

export const initGui = async (world: World): Promise<GUI> => {
  const { GUI } = await import('dat.gui');
  gui = new GUI();
  const terrainGui = gui.addFolder('Terrain');
  addWireframeGui(terrainGui, world);
  addContourThicknessGui(terrainGui, world);
  addGradientColourGui(terrainGui, world, { key: 'colorA', label: 'Gradient start' });
  addGradientColourGui(terrainGui, world, { key: 'colorB', label: 'Gradient end' });
  const cursorGui = gui.addFolder('Cursor');
  addCursorActionGui(cursorGui);
  addBrushSizeGui(cursorGui);
  return gui;
};

const addWireframeGui = (folder: GUI, world: World): void => {
  folder.add(world.material, 'wireframe').name('wireframe').listen();
};

const addContourThicknessGui = (folder: GUI, world: World): void => {
  folder
    .add(world.material.uniforms.contourThickness, 'value', 0.1, 0.5)
    .name('Contour Thickness')
    .listen();
};

const addGradientColourGui = (
  folder: GUI,
  world: World,
  { key, label }: { key: 'colorA' | 'colorB'; label: string }
): void => {
  GuiStore[key] = world.material.uniforms[key].value.getHex();
  folder
    .addColor(GuiStore, key)
    .onChange(() => {
      if (GuiStore[key]) {
        world.material.uniforms[key].value = new Color().setHex(GuiStore[key] as number);
      }
    })
    .name(label)
    .listen();
};

const addBrushSizeGui = (folder: GUI): void => {
  folder.add(Cursor, 'MAX_CLICK_DISTANCE', 10, 30).name('Brush size').listen();
};

const addCursorActionGui = (folder: GUI): void => {
  const cursor = {
    [ElevationCursor.ADD]: true,
    [ElevationCursor.REMOVE]: false
  };
  const setChecked = (key: ElevationCursor) => {
    for (const param in cursor) {
      cursor[param as ElevationCursor] = false;
    }
    GuiStore.cursor = key;
    cursor[key] = true;
  };
  folder
    .add(cursor, ElevationCursor.ADD)
    .name('Add')
    .listen()
    .onChange(() => setChecked(ElevationCursor.ADD));
  folder
    .add(cursor, ElevationCursor.REMOVE)
    .name('Remove')
    .listen()
    .onChange(() => setChecked(ElevationCursor.REMOVE));
};

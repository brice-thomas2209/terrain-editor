import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';
import Stats from 'three/examples/jsm/libs/stats.module';

class Loop {
  private camera: PerspectiveCamera;
  private scene: Scene;
  private renderer: WebGLRenderer;
  private css2dRenderer: CSS2DRenderer;
  private css3dRenderer: CSS3DRenderer;
  private stats: any;
  constructor(
    camera: PerspectiveCamera,
    scene: Scene,
    renderer: WebGLRenderer,
    css2dRenderer: CSS2DRenderer,
    css3dRenderer: CSS3DRenderer
  ) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.css2dRenderer = css2dRenderer;
    this.css3dRenderer = css3dRenderer;

    this.stats = Stats();
    this.stats.showPanel(0);
    this.stats.dom.style.position = 'absolute';
    this.stats.dom.style.bottom = '0px';
    this.stats.dom.style.top = 'auto';
    document.body.appendChild(this.stats.dom);
  }
  start() {
    this.renderer.setAnimationLoop(() => {
      this.stats.begin();
      this.renderer.render(this.scene, this.camera);
      this.css2dRenderer.render(this.scene, this.camera);
      this.css3dRenderer.render(this.scene, this.camera);
      this.stats.end();
    });
  }
  stop() {
    this.renderer.setAnimationLoop(null);
  }
}

export { Loop };

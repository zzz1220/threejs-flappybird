export default class BaseElement {
  components: THREE.Mesh[] = [];
  scene: THREE.Scene;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }

  register(scene: THREE.Scene) {
    this.components.forEach((comp) => {
      scene.add(comp);
    });
  }

  remove(dispose: boolean = false) {
    this.components.forEach((comp) => {
      this.scene?.remove(comp);
      if (dispose) {
        comp.geometry.dispose();
        if (Array.isArray(comp.material)) {
          comp.material.forEach((mi) => mi.dispose());
        } else {
          comp.material.dispose();
        }
      }
    });
  }
}

export default class BaseElement {
  components: THREE.Mesh | THREE.Mesh[] = [];
  private scene: THREE.Scene | null = null;

  register(scene: THREE.Scene) {
    if (Array.isArray(this.components)) {
      this.components.forEach((comp) => {
        scene.add(comp);
      });
    } else {
      scene.add(this.components);
    }
  }

  remove() {
    if (Array.isArray(this.components)) {
      this.components.forEach((comp) => {
        this.scene?.remove(comp);
        comp.geometry.dispose();
      });
    } else {
      this.scene?.remove(this.components);
      this.components.geometry.dispose();
    }
  }
}

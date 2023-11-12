import * as THREE from "three";
import BaseElement from "./baseElement";

export default class Gameover extends BaseElement {
  material: THREE.MeshBasicMaterial;

  constructor(scene: THREE.Scene) {
    super(scene);
    const loader = new THREE.TextureLoader();
    const plane = new THREE.PlaneGeometry(192, 42);
    const texture1 = loader.load("sprites/gameover.png");
    const material = new THREE.MeshBasicMaterial({
      map: texture1,
      transparent: true,
    });
    this.material = material;
    material.visible = false;
    const mesh = new THREE.Mesh(plane, material);
    this.components.push(mesh);
    this.register(scene);
  }

  show() {
    this.material.visible = true;
  }

  hide() {
    this.material.visible = false;
  }
}

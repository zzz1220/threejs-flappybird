import * as THREE from "three";
import BaseElement from "./baseElement";

export default class Menu extends BaseElement {
  private material?: THREE.MeshBasicMaterial;
  constructor(scene: THREE.Scene) {
    super(scene);
    const loader = new THREE.TextureLoader();
    const plane = new THREE.PlaneGeometry(184, 267);
    const texture1 = loader.load("sprites/message.png");
    const material = new THREE.MeshBasicMaterial({
      map: texture1,
      transparent: true,
    });
    material.visible = false;
    this.material = material;
    const mesh = new THREE.Mesh(plane, material);
    this.components.push(mesh);
    this.register(scene);
  }

  show() {
    this.material!.visible = true;
  }

  hide() {
    this.material!.visible = false;
  }
}

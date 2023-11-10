import * as THREE from "three";
import BaseElement from "./baseElement";

class Pillar extends BaseElement {
  components: any = [];

  constructor() {
    super();
    this.addPillar();
  }
  addPillar() {
    const texture = new THREE.TextureLoader().load("sprites/pipe-green.png");
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;

    texture.needsUpdate = true;

    const geometry = new THREE.PlaneGeometry(20, 100);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    material.map!.needsUpdate = true;

    const mesh = new THREE.Mesh(geometry, material);
    this.components.push(mesh);
  }
}

export default class Pillars {
  private list: Pillar[] = [];

  constructor() {}

  update() {}
}

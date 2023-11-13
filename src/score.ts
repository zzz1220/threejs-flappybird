import * as THREE from "three";

import BaseElement from "./baseElement";
import { getScore } from "./gameStatus";

const loader = new THREE.TextureLoader();

const numbers: THREE.Texture[] = [];

for (let i = 0; i < 9; i++) {
  numbers[i] = loader.load(`sprites/${i}.png`);
}

export default class Score extends BaseElement {
  meshes: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>[] = [];

  group?: THREE.Group;

  constructor(scene: THREE.Scene) {
    super(scene);
    const planeGeometry = new THREE.PlaneGeometry(32, 32);
    for (let i = 0; i < 10; i++) {
      const material = new THREE.MeshBasicMaterial({
        map: numbers[i],
        transparent: true,
      });
      const mesh = new THREE.Mesh(planeGeometry, material);
      mesh.position.y = 300;
      this.meshes.push(mesh);
    }
  }

  adjustToCenter(group: any) {
    var box3 = new THREE.Box3();
    box3.expandByObject(group);
    var center = new THREE.Vector3();
    box3.getCenter(center);
    group.position.x = group.position.x - center.x;
  }

  update() {
    const score = getScore();
    const strScore = `${score}`;
    const group = new THREE.Group();
    for (let s of strScore) {
      const index = +s;
      const c = this.meshes[index];
      c.position.x = index * 32;
      group.add(c);
    }
    group.position.y = -90;
    this.group = group;
    this.adjustToCenter(group);
    this.scene.add(group);
  }
}

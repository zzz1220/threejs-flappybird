import * as THREE from "three";

import BaseElement from "./baseElement";
import { getScore } from "./gameStatus";

const loader = new THREE.TextureLoader();

const numbers: THREE.Texture[] = [];

for (let i = 0; i < 10; i++) {
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
      const group = new THREE.Group();

      group.position.y = -90;
      this.group = group;
      this.scene.add(group);
    }
  }

  adjustToCenter(group: any) {
    var box3 = new THREE.Box3();
    box3.expandByObject(group);
    var center = new THREE.Vector3();
    box3.getCenter(center);
    group.position.x = group.position.x - center.x;
  }

  update(_deltaSeconds?: number) {
    const score = getScore();
    const strScore = `${score}`;
    const group = this.group;
    group?.clear();
    for (let i = 0; i < strScore.length; i++) {
      const index = +strScore[i];
      const c = this.meshes[index].clone();
      c.position.x = i * 32;
      this.group?.add(c);
    }
    this.adjustToCenter(group);
  }
}

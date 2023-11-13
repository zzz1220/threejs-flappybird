import * as THREE from "three";

import BaseElement from "./baseElement";

const loader = new THREE.TextureLoader();

const numbers: THREE.Texture[] = [];

for (let i = 0; i < 9; i++) {
  numbers[i] = loader.load(`sprites/${i}.png`);
}

export default class Score extends BaseElement {
  meshes: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>[] = [];

  group?: THREE.Group;

  private currentScore = 0;
  constructor(scene: THREE.Scene) {
    super(scene);
    const planeGeometry = new THREE.PlaneGeometry(32, 32);
    for (let i = 0; i < 10; i++) {
      const material = new THREE.MeshBasicMaterial({
        map: numbers[i],
        side: THREE.DoubleSide,
        transparent: true,
      });
      const mesh = new THREE.Mesh(planeGeometry, material);
      this.meshes.push(mesh);
    }
  }

  clear() {
    // this.scene.remove(...this.meshes);
  }

  hide() {
    this.group!.visible = false;
  }

  adjustToCenter(group: any) {
    var box3 = new THREE.Box3();
    box3.expandByObject(group);
    var center = new THREE.Vector3();
    box3.getCenter(center);
    group.position.x = group.position.x - center.x;
  }

  showScore(score: number) {
    // TODO: 根据传入的数字更新
    if (this.currentScore === score) {
      return;
    }
    this.clear();
    this.currentScore = score;
    const strScore = `${score}`;
    const group = new THREE.Group();
    for (let s of strScore) {
      const index = +s;
      const c = this.meshes[index];
      c.position.x = index * 32;
      group.add(c);
    }
    group.position.y = 80;
    this.group = group;
    this.adjustToCenter(group);
    this.scene.add(group);
  }
}

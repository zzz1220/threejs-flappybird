import * as THREE from "three";

import BaseElement from "./baseElement";

const loader = new THREE.TextureLoader();

const numbers = [];

for (let i = 0; i < 9; i++) {
  numbers[i] = loader.load(`sprites/${i}.png`);
}

export default class Score extends BaseElement {
  constructor(scene: THREE.Scene) {
    super(scene);
  }
}

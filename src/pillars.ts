import * as THREE from "three";
import BaseElement from "./baseElement";

class Pillar {
  meshes: THREE.Mesh[] = [];
  constructor(x: number) {
    this.addPillar(x, -200);
  }
  addPillar(x: number, y: number) {
    const texture = new THREE.TextureLoader().load("sprites/pipe-green.png");
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    texture.flipY = true;
    const geometry = new THREE.PlaneGeometry(80, 400);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
    });
    material.map!.needsUpdate = true;
    const bottom = new THREE.Mesh(geometry, material);
    bottom.position.set(x, y, 0);

    const top = bottom.clone();
    top.rotateZ(Math.PI);
    top.position.set(x, 400, 0);
    this.meshes.push(top, bottom);
  }

  update() {
    this.meshes.forEach((m) => (m.position.x -= 4));
  }
}

export default class Pillars extends BaseElement {
  private list: Pillar[] = [];

  constructor(scene: THREE.Scene) {
    super(scene);
    for (let i = 0; i < 3; i++) {
      this.list.push(new Pillar(i * 300));
      this.components.push(
        ...this.list.reduce(
          (p, c) => p.concat(...c.meshes),
          [] as THREE.Mesh[],
        ),
      );
    }
    this.register(this.scene);
  }

  update() {
    // TODO: 更新x 坐标
    this.list.forEach((p) => {
      p.update();
    });
  }
}

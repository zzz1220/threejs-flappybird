import * as THREE from "three";
import BaseElement from "./baseElement";
import { PLANE_PIXEL_WIDTH } from "./constant";
import { addScore } from "./gameStatus";

class Pillar {
  meshes: THREE.Mesh[] = [];
  private isScored;
  constructor(x: number) {
    this.isScored = false;
    this.addPillar(x, -200);
  }
  addPillar(x: number, y: number) {
    const texture = new THREE.TextureLoader().load("sprites/pipe-green.png");
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    texture.flipY = true;
    const geometry = new THREE.PlaneGeometry(40, 200);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
    });
    material.map!.needsUpdate = true;
    const bottom = new THREE.Mesh(geometry, material);
    bottom.position.set(x, y, 0);

    const top = bottom.clone();
    top.rotateZ(Math.PI);
    top.position.set(x, 156, 0);
    this.meshes.push(top, bottom);
  }

  update() {
    this.meshes.forEach((m, index) => {
      if (index === 0) {
        // only top
        if (m.position.x < 0 && !this.isScored) {
          addScore();
          this.isScored = true;
        }
      }
      if (m.position.x > -PLANE_PIXEL_WIDTH / 2) {
        m.position.x -= 1;
      } else {
        m.position.x = 244;
        this.isScored = false;
      }
    });
  }
}

export default class Pillars extends BaseElement {
  private list: Pillar[] = [];

  constructor(scene: THREE.Scene) {
    super(scene);
    for (let i = 0; i < 3; i++) {
      this.list.push(new Pillar(i * 130));
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

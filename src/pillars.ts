import * as THREE from "three";
import BaseElement from "./baseElement";
import {
  PILLARS_HEIGHT,
  PILLARS_WIDTH,
  PLANE_PIXEL_HEIGHT,
  PLANE_PIXEL_WIDTH,
} from "./constant";
import { addScore } from "./gameStatus";
import audioController, { Audio } from "./audioController";

class Pillar {
  meshes: THREE.Mesh[] = [];
  private isScored;
  private originX: number;
  constructor(x: number) {
    this.isScored = false;
    this.originX = x;
    this.addPillar(x);
  }
  addPillar(x: number) {
    const y = -200 - Math.floor(Math.random() * 256);
    const texture = new THREE.TextureLoader().load("sprites/pipe-green.png");
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    texture.flipY = true;
    const geometry = new THREE.PlaneGeometry(40, PILLARS_HEIGHT);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
    });
    material.map!.needsUpdate = true;
    const bottom = new THREE.Mesh(geometry, material);
    bottom.position.set(x, y, 0);
    const top = bottom.clone();
    top.rotateZ(Math.PI);
    top.position.set(x, y + PLANE_PIXEL_HEIGHT + 140, 0);
    this.meshes.push(top, bottom);
  }

  update() {
    this.meshes.forEach((m, index) => {
      if (index === 0) {
        // only top
        if (m.position.x < 0 && !this.isScored) {
          addScore();
          audioController.play(Audio.point);
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

  reset() {
    this.meshes.forEach((m) => {
      m.position.x = this.originX;
    });
  }
}

export default class Pillars extends BaseElement {
  private list: Pillar[] = [];

  constructor(scene: THREE.Scene) {
    super(scene);
    for (let i = 0; i < 3; i++) {
      this.list.push(new Pillar(i * 130 + 180));
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
    this.list.forEach((p) => {
      p.update();
    });
  }

  getBoxes() {
    const ret = [];

    for (let i = 0; i < this.components.length; i++) {
      const { x, y } = this.components[i].position ?? {};
      const min = new THREE.Vector2(
        x - PILLARS_WIDTH / 2,
        y - PILLARS_HEIGHT / 2,
      );
      const max = new THREE.Vector2(
        x + PILLARS_WIDTH / 2,
        y + PILLARS_HEIGHT / 2,
      );
      const box2 = new THREE.Box2(min, max);
      ret.push(box2);
    }
    return ret;
  }

  reset() {
    this.list.forEach((p) => p.reset());
  }
}

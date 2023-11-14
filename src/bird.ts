import * as THREE from "three";
import audioContriller, { Audio } from "./audioController";
import BaseElement from "./baseElement";
import { setScore } from "./gameStatus";
import { BIRD_TOUCH_AREA } from "./constant";

const downflap = "sprites/bluebird-downflap.png";
const midflap = "sprites/bluebird-midflap.png";
const upflap = "sprites/bluebird-upflap.png";

const loader = new THREE.TextureLoader();

const texture1 = loader.load(midflap);
const texture2 = loader.load(downflap);
const texture3 = loader.load(upflap);

export default class Bird extends BaseElement {
  mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial> | null = null;

  private y = 0;
  private speed = 0;

  constructor(scene: THREE.Scene) {
    super(scene);
    const body = new THREE.PlaneGeometry(32, 32);
    texture1.colorSpace = THREE.SRGBColorSpace;
    texture2.colorSpace = THREE.SRGBColorSpace;
    texture3.colorSpace = THREE.SRGBColorSpace;
    const material = new THREE.MeshBasicMaterial({
      map: texture1,
      transparent: true,
    });

    this.mesh = new THREE.Mesh(body, material);
    this.mesh.position.set(0, 0, 3);
    this.components.push(this.mesh);
    this.register(scene);
  }

  fly() {
    audioContriller.play(Audio.wing);
    this.speed = 3;
  }

  checkDead(pillars: any = []) {
    let isDead = false;
    if (this.y < -206 || this.y > 256) {
      audioContriller.play(Audio.die);
      this.mesh!.rotation.z = -Math.PI * 0.25;
      isDead = true;
    }
    const { x, y } = this.mesh?.position || { x: 0, y: 0 };

    const gap = BIRD_TOUCH_AREA / 2;
    const min = new THREE.Vector2(x - gap, y - gap);
    const max = new THREE.Vector2(x + gap, y + gap);
    const box2 = new THREE.Box2(min, max);
    for (let a of pillars) {
      if (box2.intersectsBox(a)) {
        isDead = true;
      }
    }
    if (isDead) {
      audioContriller.play(Audio.die);
    }
    return isDead;
  }

  checkBoxOverlap() {}

  reset() {
    this.y = 0;
    setScore(0);
  }

  update() {
    this.mesh?.position.set(0, (this.y += this.speed), 0);
    this.speed -= 0.1;
    const material = this.mesh?.material;
    if (material) {
      if (this.speed > 0) {
        this.mesh!.rotation.z = Math.PI * 0.25;
        material.map!.image = texture3.image;
      } else {
        this.mesh!.rotation.z = 0;
        material.map!.image = texture2.image;
      }
      material.needsUpdate = true;
      material.map!.needsUpdate = true;
    }
  }
}

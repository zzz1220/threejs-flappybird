import * as THREE from "three";
import audioContriller, { Audio } from "./audioController";
import BaseElement from "./baseElement";
import { setScore } from "./gameStatus";
import {
  BIRD_DEAD_MAX_Y,
  BIRD_DEAD_MIN_Y,
  BIRD_FLY_SPEED,
  BIRD_GRAVITY,
  BIRD_HEIGHT,
  BIRD_TOUCH_AREA,
  BIRD_WIDTH,
} from "./constant";

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
    const body = new THREE.PlaneGeometry(BIRD_WIDTH, BIRD_HEIGHT);
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
    this.speed = BIRD_FLY_SPEED;
  }

  checkDead(pillars: any = []) {
    let isDead = false;
    if (this.y < BIRD_DEAD_MIN_Y || this.y > BIRD_DEAD_MAX_Y) {
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

  update(deltaSeconds: number) {
    const timeScale = deltaSeconds * 60;
    this.mesh?.position.set(0, (this.y += this.speed * timeScale), 0);
    this.speed -= BIRD_GRAVITY * timeScale;
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

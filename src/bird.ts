import * as THREE from "three";
import audioContriller, { Audio } from "./audioController";
import BaseElement from "./baseElement";

const downflap = "sprites/bluebird-downflap.png";
const midflap = "sprites/bluebird-midflap.png";
const upflap = "sprites/bluebird-upflap.png";

const loader = new THREE.TextureLoader();

const texture1 = loader.load(midflap);
const texture2 = loader.load(downflap);
const texture3 = loader.load(upflap);

export default class Bird extends BaseElement {
  mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial> | null = null;
  components: THREE.Mesh[] = [];

  private current: THREE.Texture = texture1;

  private isFlying = false;

  private lastTriggerTime: number = -1;

  private y = 0;

  private speed = 0;

  constructor() {
    super();
    const body = new THREE.PlaneGeometry(24, 24);
    texture1.colorSpace = THREE.SRGBColorSpace;
    const material = new THREE.MeshBasicMaterial({
      map: texture1,
      transparent: true,
    });
    this.mesh = new THREE.Mesh(body, material);
    this.current = texture1;
    this.mesh.position.set(0, 0, 0);
    this.components.push(this.mesh);
  }

  fly() {
    audioContriller.play(Audio.wing);
    const material = this.mesh?.material;
    if (this.current === texture1) {
      material!.map!.image = texture2.image;
      this.current = texture2;
    }
    material!.needsUpdate = true;
    material!.map!.needsUpdate = true;
    this.isFlying = true;
    this.lastTriggerTime = Date.now();
    this.speed = 0;
    console.log(`output->this.mesh.position`, this!.mesh!.position);
  }

  checkDead() {
    if (this.y < -400 || this.y > 500) {
      audioContriller.play(Audio.die);
      return true;
    }
    return false;
  }

  update() {
    if (this.isFlying) {
      this.mesh?.position.set(0, (this.y += 220), 0);
      this.isFlying = false;
    } else {
      this.mesh?.position.set(0, (this.y -= this.speed), 0);
      this.speed += 0.15;
      this.checkDead();
    }
  }
}

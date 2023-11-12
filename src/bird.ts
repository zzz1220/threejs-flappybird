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
    this.mesh.position.set(0, 0, 0);
    this.components.push(this.mesh);
    this.register(scene);
  }

  fly() {
    audioContriller.play(Audio.wing);
    this.speed = 5;
  }

  checkDead() {
    if (this.y < -400 || this.y > 500) {
      audioContriller.play(Audio.die);
      this.mesh!.rotation.z = -Math.PI * 0.25;
      return true;
    }
    return false;
  }

  reset() {
    this.y = 0;
  }

  update() {
    this.mesh?.position.set(0, (this.y += this.speed), 0);
    this.speed -= 0.15;
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
    this.checkDead();
  }
}

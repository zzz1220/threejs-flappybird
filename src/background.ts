import * as THREE from "three";
import { PLANE_PIXEL_HEIGHT, PLANE_PIXEL_WIDTH } from "./constant";
import BaseElement from "./baseElement";

export default class Background extends BaseElement {
  components: any = [];
  private bgTexture: THREE.Texture | null = null;
  private floorTexture: THREE.Texture | null = null;

  constructor() {
    super();
    this.addBg();
    this.addFloor();
  }

  addBg() {
    const texture = new THREE.TextureLoader().load(
      "sprites/background-night.png",
    );
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;

    texture.needsUpdate = true;
    this.bgTexture = texture;

    const geometry = new THREE.PlaneGeometry(
      PLANE_PIXEL_WIDTH,
      PLANE_PIXEL_HEIGHT,
    );
    const material = new THREE.MeshBasicMaterial({ map: texture });
    material.map!.needsUpdate = true;

    const mesh = new THREE.Mesh(geometry, material);
    this.components.push(mesh);
  }

  addFloor() {
    const texture = new THREE.TextureLoader().load("sprites/base.png");
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;

    texture.needsUpdate = true;
    this.floorTexture = texture;

    const geometry = new THREE.PlaneGeometry(PLANE_PIXEL_WIDTH, 200);

    const material = new THREE.MeshBasicMaterial({ map: texture });
    material.map!.needsUpdate = true;

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, -500, 0);
    this.components.push(mesh);
  }

  update() {
    const speed = 0.001;
    this.bgTexture!.offset.x += speed;
    this.floorTexture!.offset.x += speed;
  }
}

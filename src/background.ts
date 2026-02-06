import * as THREE from "three";
import {
  FLOOR_HEIGHT,
  FLOOR_SCROLL_SPEED,
  FLOOR_Y,
  PLANE_PIXEL_HEIGHT,
  PLANE_PIXEL_WIDTH,
} from "./constant";
import BaseElement from "./baseElement";

export default class Background extends BaseElement {
  private floorTexture: THREE.Texture | null = null;

  constructor(scene: THREE.Scene) {
    super(scene);
    this.addBg();
    this.addFloor();
    this.register(scene);
  }

  addBg() {
    const texture = new THREE.TextureLoader().load(
      "sprites/background-night.png",
    );
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.needsUpdate = true;
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
    const geometry = new THREE.PlaneGeometry(PLANE_PIXEL_WIDTH, FLOOR_HEIGHT);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    material.map!.needsUpdate = true;
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = FLOOR_Y;
    mesh.position.z = 3;
    this.components.push(mesh);
  }

  update(deltaSeconds: number) {
    const timeScale = deltaSeconds * 60;
    this.floorTexture!.offset.x += FLOOR_SCROLL_SPEED * timeScale;
  }
}

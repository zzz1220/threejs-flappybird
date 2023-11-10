import * as THREE from "three";
import audioController from "./audioController";
import Bird from "./bird";
import Background from "./background";
import Stats from "three/addons/libs/stats.module.js";
import { PLANE_PIXEL_WIDTH, PLANE_PIXEL_HEIGHT } from "./constant";

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

//创建stats对象
const stats = new Stats();
//stats.domElement:web页面上输出计算结果,一个div元素，
document.body.appendChild(stats.domElement);

export default class Game {
  private isRunning = false;
  private gameover = false;

  private scene = new THREE.Scene();
  private camera = new THREE.OrthographicCamera(
    (PLANE_PIXEL_WIDTH * (window.innerWidth / window.innerHeight)) / -2,
    (PLANE_PIXEL_WIDTH * (window.innerWidth / window.innerHeight)) / 2,
    PLANE_PIXEL_HEIGHT / 2,
    -PLANE_PIXEL_HEIGHT / 2,
    0,
    10,
  );

  private renderer = new THREE.WebGLRenderer({ antialias: true });

  // game objects
  private bird: Bird = new Bird();
  private background = new Background();

  constructor(options: any) {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(WIDTH, HEIGHT);
    document.body.appendChild(this.renderer.domElement);

    audioController.bindCamera(this.camera);

    // bind event
    this.bindOnClick();
    this.onWindowResize();
    //

    //
    this.bird.register(this.scene);
    this.background.register(this.scene);

    this.animate();
  }

  start() {}

  pause() {}

  update() {}

  draw() {}

  showGameover() {
    const loader = new THREE.TextureLoader();
    const plane = new THREE.PlaneGeometry(192, 42);
    const texture1 = loader.load("sprites/gameover.png");
    const material = new THREE.MeshBasicMaterial({
      map: texture1,
      transparent: true,
    });
    const mesh = new THREE.Mesh(plane, material);
    this.scene.add(mesh);
  }

  showHomePage() {
    const loader = new THREE.TextureLoader();
    const plane = new THREE.PlaneGeometry(184, 267);
    const texture1 = loader.load("sprites/message.png");
    const material = new THREE.MeshBasicMaterial({
      map: texture1,
      transparent: true,
    });
    const mesh = new THREE.Mesh(plane, material);
    this.scene.add(mesh);
  }

  bindOnClick() {
    window.addEventListener("click", () => {
      this.bird.fly();
      if (!this.isRunning) {
        this.isRunning = true;
        this.gameover = false;
        if (this.gameover) {
        } else {
        }
      }
    });
  }

  onWindowResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate() {
    // running
    if (this.isRunning) {
      stats.update();
      this.bird.update();
      this.background.update();
      if (this.bird.checkDead()) {
        this.isRunning = false;
        this.gameover = true;
        this.showGameover();
      }
    }
    // not begin the game, first enter the page
    if (!this.isRunning && !this.gameover) {
      this.showHomePage();
    }
    requestAnimationFrame(this.animate.bind(this));

    this.renderer.render(this.scene, this.camera);
  }
}

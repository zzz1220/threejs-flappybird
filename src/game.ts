import * as THREE from "three";
import audioController from "./audioController";
import Bird from "./bird";
import Background from "./background";
import Stats from "three/addons/libs/stats.module.js";
import { PLANE_PIXEL_WIDTH, PLANE_PIXEL_HEIGHT } from "./constant";
import Menu from "./menu";
import Gameover from "./gameover";
import Pillars from "./pillars";
import Score from "./score";
import score from "./score";
import { addScore, getScore } from "./gameStatus";

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

let stats: any;
if (import.meta.env.DEV) {
  //创建stats对象
  stats = new Stats();
  //stats.domElement:web页面上输出计算结果,一个div元素，
  document.body.appendChild(stats.domElement);
}

export default class Game {
  private isRunning = false;

  private scene = new THREE.Scene();
  private camera = new THREE.OrthographicCamera(
    PLANE_PIXEL_WIDTH / -2,
    PLANE_PIXEL_WIDTH / 2,
    PLANE_PIXEL_HEIGHT / 2,
    -PLANE_PIXEL_HEIGHT / 2,
    0,
    9,
  );

  private renderer = new THREE.WebGLRenderer({ antialias: true });

  // game objects
  private bird = new Bird(this.scene);
  private background = new Background(this.scene);
  private menu = new Menu(this.scene);
  private gameover = new Gameover(this.scene);
  private pillars = new Pillars(this.scene);
  private scorePane = new Score(this.scene);

  constructor() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(PLANE_PIXEL_WIDTH, PLANE_PIXEL_HEIGHT);
    document.getElementById("app")?.appendChild(this.renderer.domElement);
    this.camera.position.z = 3;
    audioController.bindCamera(this.camera);
    // bind event
    this.bindOnClick();
    this.onWindowResize();

    this.animate();
  }

  start() {}

  pause() {}

  update() {}

  draw() {}

  bindOnClick() {
    document.addEventListener("click", () => {
      this.bird.fly();
      if (!this.isRunning) {
        this.bird.reset();
        this.isRunning = true;
        this.gameover.hide();
        this.menu.hide();
      }
    });
  }

  onWindowResize() {
    this.renderer.setSize(PLANE_PIXEL_WIDTH, PLANE_PIXEL_HEIGHT);
  }

  animate() {
    if (this.isRunning) {
      if (import.meta.env.DEV) {
        stats.update();
      }
      this.bird.update();
      this.background.update();
      this.pillars.update();
      this.scorePane.update();
      if (this.bird.checkDead()) {
        this.isRunning = false;
        this.gameover.show();
      }
    }

    if (!this.isRunning && getScore() === -1) {
      this.menu.show();
    }
    requestAnimationFrame(this.animate.bind(this));

    this.renderer.render(this.scene, this.camera);
  }
}

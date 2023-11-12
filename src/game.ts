import * as THREE from "three";
import audioController from "./audioController";
import Bird from "./bird";
import Background from "./background";
import Stats from "three/addons/libs/stats.module.js";
import { PLANE_PIXEL_WIDTH, PLANE_PIXEL_HEIGHT } from "./constant";
import Menu from "./menu";
import Gameover from "./gameover";
import Pillars from "./pillars";

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

  private score = -1; // -1 表示第一次进入游戏

  private scene = new THREE.Scene();
  private camera = new THREE.OrthographicCamera(
    (PLANE_PIXEL_WIDTH * (window.innerWidth / window.innerHeight)) / -2,
    (PLANE_PIXEL_WIDTH * (window.innerWidth / window.innerHeight)) / 2,
    PLANE_PIXEL_HEIGHT / 2,
    -PLANE_PIXEL_HEIGHT / 2,
    0,
    2,
  );

  private renderer = new THREE.WebGLRenderer({ antialias: true });

  // game objects
  private bird: Bird = new Bird(this.scene);
  private background = new Background(this.scene);
  private menu = new Menu(this.scene);
  private gameover = new Gameover(this.scene);
  private pillars = new Pillars(this.scene);

  constructor() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(WIDTH, HEIGHT);
    document.body.appendChild(this.renderer.domElement);

    audioController.bindCamera(this.camera);

    // bind event
    this.bindOnClick();
    this.onWindowResize();
    //

    this.animate();
  }

  start() {}

  pause() {}

  update() {}

  draw() {}

  bindOnClick() {
    window.addEventListener("click", () => {
      this.bird.fly();
      if (!this.isRunning) {
        if (this.score === -1) {
          this.score = 0;
        } else {
          this.bird.reset();
        }
        this.isRunning = true;
        this.gameover.hide();
        this.menu.hide();
      }
    });
  }

  onWindowResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate() {
    if (this.isRunning) {
      if (import.meta.env.DEV) {
        stats.update();
      }
      this.bird.update();
      this.background.update();
      this.pillars.update();
      if (this.bird.checkDead()) {
        this.isRunning = false;
        this.gameover.show();
      }
    }

    if (!this.isRunning && this.score === -1) {
      this.menu.show();
    }
    requestAnimationFrame(this.animate.bind(this));

    this.renderer.render(this.scene, this.camera);
  }
}

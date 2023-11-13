import * as THREE from "three";

export enum Audio {
  wing = "audio/wing.ogg",
  die = "audio/die.ogg",
  hit = "audio/hit.ogg",
  point = "audio/point.ogg",
  swoosh = "audio/swoosh.ogg",
}

class AudioController {
  private audioLoader = new THREE.AudioLoader();
  private listener = new THREE.AudioListener();
  private sound = new THREE.Audio(this.listener);

  bindCamera(camera: THREE.Camera) {
    camera.add(this.listener);
  }

  // TODO: 先加载再播放，不要重复加载
  play(audio: Audio) {
    this.audioLoader.load(audio, (buffer) => {
      this.sound.setBuffer(buffer);
      this.sound.setVolume(0.5);
      this.sound.play();
    });
  }
}

export default new AudioController();

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
  private scoreSound = new THREE.Audio(this.listener);

  private memo = new Map();

  bindCamera(camera: THREE.Camera) {
    camera.add(this.listener);
  }

  play(audio: Audio) {
    let sound = this.sound;
    if (audio === Audio.point) {
      sound = this.scoreSound;
    }
    if (this.memo.has(audio)) {
      sound.setBuffer(this.memo.get(audio));
      sound.setVolume(0.5);
      sound.play();
    }
    this.audioLoader.load(audio, (buffer) => {
      this.memo.set(audio, buffer);
      sound.setBuffer(buffer);
      sound.setVolume(0.5);
      sound.play();
    });
  }
}

export default new AudioController();

export class Sound {
  #dingSound
  #dingDingSound

  constructor() {
    this.#dingSound = new Audio('../sound/ding.mp3')
    this.#dingDingSound = new Audio('../sound/ding-ding.mp3')
  }

  playDing() {
    this.#dingSound.play()
  }

  playDingDing() {
    this.#dingDingSound.play()
  }
}

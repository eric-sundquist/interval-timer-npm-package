export class Sound {
  #dingSound
  #dingDingSound

  constructor() {
    this.#dingSound = new Audio('../sound/ding.mp3')
    this.#dingDingSound = new Audio('../sound/ding-ding.mp3')
  }

  playDing() {
    this.#stopSound(this.#dingDingSound)

    this.#dingSound.play()
  }

  playDingDing() {
    this.#stopSound(this.#dingSound)

    this.#dingDingSound.play()
  }

  #stopSound(sound) {
    sound.pause()
    sound.currentTime = 0
  }
}

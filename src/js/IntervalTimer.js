import { Timer } from 'tick-tock-timer'
import { Sound } from './Sound'

export class IntervalTimer {
  /**
   * @type {number}
   */
  #sets
  #setCount

  /**
   * @type {number} - time in milleseconds.
   */
  #workTime

  /**
   * @type {number} - time in milleseconds.
   */
  #restTime
  #timer
  #isWorkTime
  #soundEffect

  /**
   * @type {HTMLSpanElement}
   */
  #eventHandlerElement = document.createElement('span')

  constructor(sets, workingTime, restTime) {
    this.#sets = sets
    this.#setCount = 1
    this.#workTime = workingTime
    this.#restTime = restTime
    this.#isWorkTime = false
    this.#timer = new Timer()
    this.#soundEffect = new Sound()
    this.#timer.addEventListener('expired', (event) => this.#handleTimerExpiredEvent(event))
  }

  start() {
    this.#isWorkTime = true
    this.#timer.setTime(this.#workTime)
    this.#timer.start()
  }

  addEventListener(event, callback) {
    this.#timer.addEventListener(event, callback)
  }

  setWorkTime(workTime) {
    // TODO: Validation..
    this.#workTime = workTime
  }

  setRestTime(restTime) {
    // TODO: Validation..
    this.#restTime = restTime
  }

  setSets(sets) {
    // TODO: Validation..
    this.#sets = sets
  }

  get isWorkTime() {
    return this.#isWorkTime
  }

  #handleTimerExpiredEvent() {
    if (this.#isWorkTime) {
      this.#soundEffect.playDingDing()
      this.#isWorkTime = false
      this.#timer.setTime(this.#restTime)
    } else {
      this.#soundEffect.playDing()
      this.#isWorkTime = true
      this.#setCount += 1
      this.#timer.setTime(this.#workTime)
    }
    if (this.#hasSetsLeft()) {
      this.#timer.start()
    }
  }

  #hasSetsLeft() {
    return this.#setCount <= this.#sets
  }
}

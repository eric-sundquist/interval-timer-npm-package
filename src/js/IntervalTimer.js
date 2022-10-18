import { Timer } from 'tick-tock-timer'
import { Sound } from './Sound'

export class IntervalTimer {
  /**
   * @type {number}
   */
  #sets
  /**
   * @type {number}
   */
  #currentSet
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
    this.#currentSet = 1
    this.#workTime = workingTime
    this.#restTime = restTime
    this.#isWorkTime = false
    this.#timer = new Timer()
    this.#soundEffect = new Sound()
    this.#timer.addEventListener('expired', (event) => this.#handleTimerExpiredEvent(event))
  }

  startNew() {
    this.#isWorkTime = true
    this.#timer.setTime(this.#workTime)
    this.start()
  }

  start() {
    this.#timer.start()
  }

  pause() {
    this.#timer.pause()
  }

  reset() {
    this.#isWorkTime = true
    this.#timer.setTime(this.#workTime)
  }

  addEventListener(event, callback) {
    this.#timer.addEventListener(event, callback)
  }

  setWorkTime(workTime) {
    this.#validatePositiveInteger(workTime)
    this.#workTime = workTime
  }

  setRestTime(restTime) {
    this.#validatePositiveInteger(restTime)
    this.#restTime = restTime
  }

  setSets(sets) {
    this.#validatePositiveInteger(sets)
    this.#sets = sets
  }

  getSets() {
    return this.#sets
  }

  getCurrentSet() {
    return this.#currentSet
  }

  isWorkTime() {
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
      this.#currentSet += 1
      this.#timer.setTime(this.#workTime)
    }
    if (!this.isExpired()) {
      this.#timer.start()
    }
  }

  isExpired() {
    return this.#currentSet > this.#sets
  }

  #validatePositiveInteger(number) {
    if (!Number.isInteger(number) || Number.isNaN(number) || number < 1) {
      throw new TypeError('Recieved argument is not of right type. Expected integer greater than 0.')
    }
  }
}

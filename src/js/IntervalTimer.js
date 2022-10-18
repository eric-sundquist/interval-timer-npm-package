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
  #isExpired
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
    this.#isExpired = false
    this.#timer = new Timer()
    this.#soundEffect = new Sound()
    this.#timer.addEventListener('expired', (event) => this.#handleTimerInstanceExpired(event))
  }

  #handleTimerInstanceExpired() {
    if (this.#isWorkTime) {
      this.#handleWorkTimerExpire()
    } else {
      this.#handleRestTimeExpire()
    }
  }

  #handleWorkTimerExpire() {
    this.#soundEffect.playDingDing()

    if (!this.#isLastSet()) {
      this.#doRestTimer()
    } else {
      this.#isExpired = true
    }
  }

  #isLastSet() {
    return this.#currentSet === this.#sets
  }

  #handleRestTimeExpire() {
    this.#soundEffect.playDing()
    this.#currentSet += 1
    this.#doWorkTimer()
  }

  #doRestTimer() {
    this.#isWorkTime = false
    this.#timer.setTime(this.#restTime)
    this.#timer.start()
  }

  #doWorkTimer() {
    this.#isWorkTime = true
    this.#timer.setTime(this.#workTime)
    this.#timer.start()
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
    this.#isExpired = false
    this.#currentSet = 1
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

  isExpired() {
    return this.#isExpired
  }

  #validatePositiveInteger(number) {
    if (!Number.isInteger(number) || Number.isNaN(number) || number < 1) {
      throw new TypeError('Recieved argument is not of right type. Expected integer greater than 0.')
    }
  }
}

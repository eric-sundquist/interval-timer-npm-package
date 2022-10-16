import { Timer } from 'tick-tock-timer'

export class IntervalTimer {
  /**
   * @type {number}
   */
  #sets

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
  #isRestTime

  constructor(sets, workingTime, restTime) {
    this.#sets = sets
    this.#workTime = workingTime
    this.#restTime = restTime
    this.#timer = new Timer()
    this.#isWorkTime = false
    this.#isRestTime = false
  }

  start() {
    // this.#isWorkTime = true
    // this.#timer.setTime(this.#workTime)
    // this.#timer.addEventListener
    console.log('starting clock TODO')
  }
}

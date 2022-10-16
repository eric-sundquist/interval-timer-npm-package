import { Timer } from 'tick-tock-timer'

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
  #isRestTime

  constructor(sets, workingTime, restTime) {
    this.#sets = sets
    this.#setCount = 1
    this.#workTime = workingTime
    this.#restTime = restTime
    this.#isWorkTime = false
    this.#isRestTime = false
    this.#timer = new Timer()
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

  #handleTimerExpiredEvent() {
    if (this.setCount <= this.sets) {
      if (this.#isWorkTime) {
        // Do rest time
        this.#isRestTime = true
        this.#isWorkTime = false

        this.#timer.setTime(this.#restTime)
      } else {
        // do work time
        this.#isRestTime = false
        this.#isWorkTime = true
        this.#setCount++

        this.#timer.setTime(this.#workTime)
      }

      this.#timer.start()
    } else {
      // intervals expired
    }
  }

  #isStopped() {
    return !(this.#isWorkTime && this.#isRestTime)
  }
}

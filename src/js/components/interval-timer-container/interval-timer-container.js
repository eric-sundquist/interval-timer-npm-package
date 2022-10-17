import '../interval-timer-setup'
import '../interval-timer-time-display'
import '../interval-timer-controls'
import { IntervalTimer } from '../../IntervalTimer'
import { Sound } from '../../Sound'

const template = document.createElement('template')
template.innerHTML = `
  <style>
    * {
      box-sizing: border-box;
    }
    :host {
      display: block;
    }

    .hidden {
      display: none;
    }
  </style>

  <h1>Tick tock interval timer</h1>
  <p>
    This explains a jolly good tick tock interval timer.
  </p>

  <interval-timer-time-display class="hidden"></interval-timer-time-display>
  <interval-timer-controls class="hidden"></interval-timer-controls>
  <interval-timer-setup></interval-timer-setup>

`

customElements.define(
  'interval-timer-container',
  class extends HTMLElement {
    #timer

    #soundEffect

    constructor() {
      super()
      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))

      this.#timer = new IntervalTimer()

      this.#soundEffect = new Sound()

      this.#setupEventListerners()
    }

    #setupEventListerners() {
      this.shadowRoot
        .querySelector('interval-timer-setup')
        .addEventListener('start-new-interval', (event) => this.#handleStart(event))

      this.#timer.addEventListener('updated', (event) => this.#handleUpdate(event))

      this.#timer.addEventListener('expired', (event) => this.#handleExpire(event))
    }

    /**
     * @param {Object} timerData
     */
    #startTimer(timerData) {
      this.#setTimer(timerData)

      this.#timer.start()
    }

    #setTimer(timerData) {
      this.#timer.setWorkTime(timerData.workTime)
      this.#timer.setRestTime(timerData.restTime)
      this.#timer.setSets(timerData.sets)
    }

    #handleStart(event) {
      console.log(event.detail)

      this.#toggleControls()
      this.#startTimer(event.detail)
    }

    #handleUpdate(event) {
      const timeString = event.detail.timeString
      const timeDisplayComponent = this.shadowRoot.querySelector('interval-timer-time-display')
      timeDisplayComponent.setAttribute('time', timeString)
    }

    #handleExpire(event) {
      this.#handleUpdate(event)
      this.#playSound()
    }

    #playSound() {
      if (this.#timer.isWorkTime) {
        this.#soundEffect.playDingDing()
      } else {
        this.#soundEffect.playDing()
      }
    }

    #toggleControls() {
      const timeDisplayElement = this.shadowRoot.querySelector('interval-timer-time-display')
      timeDisplayElement.classList.toggle('hidden')

      const controlsElement = this.shadowRoot.querySelector('interval-timer-controls')
      controlsElement.classList.toggle('hidden')

      const setupElement = this.shadowRoot.querySelector('interval-timer-setup')
      setupElement.classList.toggle('hidden')
    }
  }
)

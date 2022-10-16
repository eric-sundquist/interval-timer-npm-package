import '../interval-timer-setup'
import '../interval-timer-time-display'
import '../interval-timer-controls'
import { IntervalTimer } from '../IntervalTimer'

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
    constructor() {
      super()
      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))

      this.shadowRoot
        .querySelector('interval-timer-setup')
        .addEventListener('start-new-interval', (event) => this.#handleStartTimerEvent(event))
    }

    #handleStartTimerEvent(event) {
      console.log(event.detail)

      this.#toggleControls()
      this.#startTimer(event.detail)
    }

    /**
     * @param {Object} userSetTimerData
     */
    #startTimer(userSetTimerData) {
      const timer = new IntervalTimer(userSetTimerData.sets, userSetTimerData.workTime, userSetTimerData.restTime)
      timer.start()
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

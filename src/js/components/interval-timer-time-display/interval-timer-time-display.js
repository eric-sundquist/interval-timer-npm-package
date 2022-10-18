const template = document.createElement('template')
template.innerHTML = `
  <style>
    * {
      box-sizing: border-box;
    }
    :host {
      display: block;
    }

    h1 {
      font-size: 3.5rem;
    }
  </style>
    <h2 id="timer-status"></h2>
    <h1 id="time"></h1>
    <h3 id="sets-status"><h3>
`

customElements.define(
  'interval-timer-time-display',
  class extends HTMLElement {
    constructor() {
      super()
      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))
    }

    setTime(time) {
      const timeDisplayElement = this.shadowRoot.querySelector('#time')
      timeDisplayElement.textContent = time
    }

    setTimerStatus(isWorkingTime, isExpired) {
      const timerStatusElement = this.shadowRoot.querySelector('#timer-status')

      if (isExpired) {
        timerStatusElement.textContent = 'Finished'
      } else {
        if (isWorkingTime) {
          timerStatusElement.textContent = 'Work'
        } else {
          timerStatusElement.textContent = 'Rest'
        }
      }
    }

    setSetsStatus(currentSet, totalSets) {
      const setStatusElement = this.shadowRoot.querySelector('#sets-status')
      setStatusElement.textContent = `${currentSet} / ${totalSets}`
    }
  }
)

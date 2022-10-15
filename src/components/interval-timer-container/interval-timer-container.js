import '../interval-timer-setup'

const template = document.createElement('template')
template.innerHTML = `
  <style>
    * {
      box-sizing: border-box;
    }
    :host {
      display: block;
    }
  </style>

  <h1>Tick tock interval timer</h1>
  <p>
    This explains a jolly good tick tock interval timer.
  </p>

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
        .addEventListener('start-new-interval', (event) => {
          console.log(event.detail)
          // HIDE: Setup component
          // Show tiimer window
          // TODO: START TIMER
        })
    }
  }
)

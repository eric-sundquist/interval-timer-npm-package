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

    <h2 id="time">Insert time here</h2>
`

customElements.define(
  'interval-timer-time-display',
  class extends HTMLElement {
    constructor() {
      super()
      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))
    }
  }
)

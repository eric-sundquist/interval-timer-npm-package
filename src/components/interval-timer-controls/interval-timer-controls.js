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
  <p class="read-the-docs">
    Click on the button for something exciting
  </p>
`

customElements.define(
  'interval-timer-controls',
  class extends HTMLElement {
    constructor() {
      super()
      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))
    }
  }
)

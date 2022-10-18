const template = document.createElement('template')
template.innerHTML = `
  <style>
    * {
      box-sizing: border-box;
    }
    :host {
      display: block;
      margin: 0 auto;
      width: 100%;
      padding: 0.6em 1.2em;
      margin: 1rem;
      border-radius: 8px;
      background-color: #cc0000;
    }

    #errorMessage {
      text-align: center;
    }

  </style>

    <b id="errorMessage"></b>
`

customElements.define(
  'interval-timer-error',
  class extends HTMLElement {
    constructor() {
      super()
      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))
    }

    static get observedAttributes() {
      return ['error-message']
    }

    attributeChangedCallback(name, oldValue, newValue) {
      console.log(name)
      console.log(newValue)
      if (name === 'error-message') {
        this.#setErrorMessage(newValue)
      }
    }

    #setErrorMessage(message) {
      const element = this.shadowRoot.querySelector('#errorMessage')
      console.log(message)
      element.textContent = message
    }
  }
)

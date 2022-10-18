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

    <h1 id="time">Insert time here</h1>
`

customElements.define(
  'interval-timer-time-display',
  class extends HTMLElement {
    constructor() {
      super()
      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))
    }

    /**
     * Attributes to monitor for changes.
     *
     * @returns {string[]} A string array of attributes to monitor.
     */
    static get observedAttributes() {
      return ['time']
    }

    /**
     * Called when observed attribute(s) changes.
     *
     * @param {string} name - The attribute's name.
     * @param {*} oldValue - The old value.
     * @param {*} newValue - The new value.
     */
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'time') {
        this.#setTimeElement(newValue)
      }
    }

    #setTimeElement(time) {
      const timeDisplayElement = this.shadowRoot.querySelector('#time')
      timeDisplayElement.textContent = time.slice(0, -1)
    }
  }
)

const template = document.createElement('template')
template.innerHTML = `
  <style>
    * {
      box-sizing: border-box;
    }
    :host {
      display: block;
      margin: 1rem;
    }

    button {
      border-radius: 8px;
      border: 1px solid transparent;
      padding: 0.6em 1.2em;
      font-size: 1em;
      font-weight: 500;
      font-family: inherit;
      background-color: #1a1a1a;
      cursor: pointer;
      transition: border-color 0.25s;
    }
    button:hover {
      border-color: #646cff;
    }

    button:active {
      outline: 4px auto -webkit-focus-ring-color;
    }
  </style>

  <button id="start">Start</button>
  <button id="pause">Pause</button>
  <button id="reset">Reset</button>
`

customElements.define(
  'interval-timer-controls',
  class extends HTMLElement {
    /**
     * @type {HTMLButtonElement}
     */
    #startBtn
    /**
     * @type {HTMLButtonElement}
     */
    #pauseBtn
    /**
     * @type {HTMLButtonElement}
     */
    #resetBtn

    constructor() {
      super()
      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))

      this.#startBtn = this.shadowRoot.querySelector('#start')
      this.#pauseBtn = this.shadowRoot.querySelector('#pause')
      this.#resetBtn = this.shadowRoot.querySelector('#reset')

      this.#addEventListeners()
    }

    #addEventListeners() {
      this.#startBtn.addEventListener('click', (event) => this.#handleStart(event))

      this.#pauseBtn.addEventListener('click', (event) => this.#handlePause(event))

      this.#resetBtn.addEventListener('click', (event) => this.#handleReset(event))
    }

    #handleStart() {
      this.#dispatchEvent('start')
    }

    #handlePause() {
      this.#dispatchEvent('pause')
    }
    #handleReset() {
      this.#dispatchEvent('reset')
    }

    #dispatchEvent(eventName) {
      const event = new CustomEvent(eventName)
      this.dispatchEvent(event)
    }
  }
)

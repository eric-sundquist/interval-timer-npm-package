const template = document.createElement('template')
template.innerHTML = `
  <style>
    * {
      box-sizing: border-box;
    }
    :host {
      display: block;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      align-items: center;
    }

    .time-input {
      padding-right:11px; 
      text-align:right
    }

    .unit {
      margin-left:-15px
    }

    .input-container {
      display: flex;
      width: 100%;
      justify-content: space-between;
    }

    .input-field {
      margin-right: 7px;
    }

     input[type=number] {
      width: 65px;
    }
    input[type=submit]  {
      width: 100%;
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

    input[type=submit]:hover {
      border-color: #646cff;
    }

    input[type=submit]:active {
      outline: 4px auto -webkit-focus-ring-color;
    }
  </style>

  <h1>Interval timer</h1>
  <form id="timer-form" action="">
    <div class="input-container">
      <label for="work-time">Work time: </label>
      <div class="input-field">
        <input type="number" class="time-input" id="work-time" min="1" max="9999" value="30" />
        <span class="unit">s</span>
      </div>
    </div>
    <div class="input-container">
      <label for="rest-time">Rest time:</label>
      <div class="input-field">
        <input type="number" class="time-input" id="rest-time" min="1" max="9999" value="15" />
        <span class="unit">s</span>
      </div>
    </div>
    <div class="input-container">
      <label for="sets">Sets:</label>
      <div class="input-field">
        <input type="number" class="time-input" id="sets" min="-1" max="99" value="3" />
        <span class="unit">s</span>
      </div>
    </div>
    <div class="input-container">
      <input  type="submit" value="Start" />
    </div>
  </form>
`

customElements.define(
  'interval-timer-setup',
  class extends HTMLElement {
    constructor() {
      super()
      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))

      this.shadowRoot.querySelector('#timer-form').addEventListener('submit', (event) => {
        event.preventDefault()
        const startIntervalTimerEvent = new CustomEvent('start-new-interval', {
          detail: {
            workTime: this.#convertStringSecondsToMs(this.shadowRoot.querySelector('#work-time').value),
            restTime: this.#convertStringSecondsToMs(this.shadowRoot.querySelector('#rest-time').value),
            sets: parseInt(this.shadowRoot.querySelector('#sets').value),
          },
        })
        this.dispatchEvent(startIntervalTimerEvent)
      })
    }

    /**
     * @param {String} string - time in seconds.
     * @returns {number} - time in milliseconds.
     */
    #convertStringSecondsToMs(string) {
      return parseInt(string) * 1000
    }
  }
)

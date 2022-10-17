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

    .input-container {
      display: flex;
      width: 160px;
      justify-content: space-between;
    }

    .input-container > input {
      width: 65px;
    }
    .input-container > input[type=submit]  {
      width: 100%;
    }

  </style>
    <form id="timer-form" action="">
      <div class="input-container">
        <label for="work-time">Work time: </label>
        <input type="number" id="work-time" min="1" max="9999" value="30" />
      </div>

      <div class="input-container">
        <label for="rest-time">Rest time:</label>
        <input type="number" id="rest-time" min="1" max="9999" value="15" />
      </div>

      <div class="input-container">
        <label for="sets">Sets:</label>
        <input type="number" id="sets" min="1" max="99" value="3" />
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

    #convertStringSecondsToMs(string) {
      return parseInt(string) * 1000
    }
  }
)

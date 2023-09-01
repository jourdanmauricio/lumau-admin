import { LitElement, html, css } from 'lit';

class LumauSpinner extends LitElement {
  static properties = {
    loading: { type: Boolean },
  };

  static styles = css`
    :host {
      /* color: blue; */
      /* width: 100%; */
    }
    .spinner__container {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: rgba(255, 255, 255, 0.7);
      z-index: 100;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .spinner {
      width: 50px;
      height: 50px;
      margin-left: auto;
      margin-right: auto;
      border: 5px solid var(--lumau-loading-backgroud-color, rgba(0, 0, 0, 0.1));
      border-top-color: var(--lumau-loading-color, #0f766e);
      border-radius: 50%;
      animation: spinner 1s ease-out infinite;
    }

    @keyframes spinner {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `;

  constructor() {
    super();
    this.loading = false;
  }

  render() {
    return this.loading === true
      ? html`
          <div class="spinner__container">
            <div
              id="spinner"
              class="spinner"
            ></div>
          </div>
        `
      : '';
  }
}

customElements.define('lumau-spinner', LumauSpinner);

import { LitElement, html, css } from 'lit';

class LumauMessage extends LitElement {
  static properties = {
    errorForm: { type: String },
  };

  static styles = css`
    :host {
      /* color: blue; */
      /* width: 100%; */
    }
    .form__error {
      position: absolute;
      text-align: center;
      font-size: 14px;
      width: 100%;
      border-radius: 0.25rem;
      font-size: 0.875rem 
      line-height: 1.25rem;
      color: var(--lumau-input-error-color, #c00);
      display: block;
      transition-property: opacity;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 1000ms;
      opacity: 1;
      z-index:10;
    }

    .error__msg {
      opacity: 0;
    }
  `;

  constructor() {
    super();
    this.errorForm = '';
  }

  render() {
    // return html`<span>${this.errorForm}</span>`;
    return html`<span
      class="form__error ${!this.errorForm ? 'error__msg' : ''}"
    >
      ${this.errorForm}
    </span>`;
  }
}

customElements.define('lumau-message', LumauMessage);

import { html, css, LitElement } from 'lit';

export class LumauNav extends LitElement {
  static get styles() {
    return css`
      :host {
      }

      nav {
        position: sticky;
        top: 0px;
        height: 3rem;
        background-color: yellow;
        z-index: 10;
        padding: 0 1rem;
        display: flex;
        align-items: center;
        justify-content: space-around;
      }

      .title {
        overflow: hidden;
        flex-grow: 1;
        color: #000;
      }
    `;
  }
  static get properties() {
    return {
      menu: {
        type: String,
        reflect: true,
      },
    };
  }

  constructor() {
    super();
    this.menu = 'left';
  }

  render() {
    return html`
      <nav>
        <div class="menu"><slot name="menu"></slot></div>
        <div class="title"><slot name="title"></slot></div>
        <div><slot name="actions"></slot></div>
      </nav>
    `;
  }
}

customElements.define('lumau-nav', LumauNav);

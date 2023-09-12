import { LitElement, css, html } from 'lit';

class LumauInput extends LitElement {
  static formAssociated = true;
  static properties = {
    disabled: { type: Boolean },
    readonly: { type: Boolean },
    required: { type: Boolean },
    label: { type: String },
    controlType: { type: String },
    togglePassword: { type: Boolean },
    passwordVisible: { type: Boolean },
    placeholder: { type: String },
    name: { type: String },
    id: { type: String },
    message: { type: String },
    error: { type: String },
    selectOnFocus: { type: Boolean },
    value: { type: String },
    pattern: { type: String },
    patternerror: { type: String },
  };
  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    :host {
      /* color: blue; */
      /* width: 100%; */
    }

    * {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
    }

    .field {
      position: relative;
      display: flex;
      flex-flow: column-reverse;
      margin-bottom: 1rem;
    }

    label,
    input {
      transition: all 0.3s;
    }

    input {
      width: 100%;
      border: 1px solid var(--lumau-input-border-color, #334155);
      border-radius: 0.25rem;
      color: var(--lumau-input-text-color, #334155);
      padding: var(--lumau-input-padding-y, 0.5rem) 0.8rem;
      min-height: auto;
      font-size: 1rem;
      background-color: var(--lumau-input-background-color, #fff);
      outline: 1px solid transparent;
      letter-spacing: 0.05rem;
    }

    input:disabled,
    input:disabled + label {
      background-color: var(--lumau-input-disabled-background-color, #e2e8f0);
    }

    label {
      width: fit-content;
      font-size: 14px;
      color: var(--lumau-input-text-color, #334155);
      padding: 0 2px;
      /* transform-origin: left bottom; */
      background-color: transparent;
    }

    input:placeholder-shown + label {
      cursor: text;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      transform: translate(
        0.8rem,
        calc(var(--lumau-input-padding-y, 0.5rem) + 1.3rem)
      );
    }

    ::-webkit-input-placeholder {
      opacity: 0;
      transition: inherit;
    }

    input:focus::-webkit-input-placeholder {
      opacity: 1;
      color: var(--lumau-input-text-color, #334155);
    }

    input:not(:placeholder-shown) + label,
    input:focus + label {
      transform: translate(0.4rem, 0rem);
      cursor: pointer;
    }

    .errored {
      border-color: var(--lumau-input-error-border-color, #c00);
    }

    .message span {
      display: block;
    }

    .input__error {
      position: absolute;
      text-align: left;
      top: -1rem;
      left: 0.6rem;
      width: 91.666667%;
      border-radius: 0.25rem;
      font-size: 0.875rem;
      color: var(--lumau-input-error-color, #c00);
      display: block;
      transition-property: opacity;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 1000ms;
      opacity: 1;
    }

    .error__msg {
      opacity: 0;
    }

    .err {
      position: relative;
    }

    .input__password-toggle {
      position: absolute;
      font-size: 1rem;
      top: calc(var(--lumau-input-padding-y, 0.5rem) + 1.5rem);
      right: 1rem;
      color: var(--lumau-input-text-color, #334155);
      border: none;
      background: none;
      padding: 0;
      cursor: pointer;
    }
  `;

  constructor() {
    super();
    this.internals_ = this.attachInternals();

    // Declare reactive properties
    this.label = '';
    this.placeholder = '';
    this.name = '';
    this.message = '';
    this.error = '';
    this.id = '';
    this.value = '';
    this.pattern = '';
    this.patternerror = '';
    this.controlType = 'text';
    this.passwordVisible = false;
    this.disabled = false;
    this.readonly = false;
    this.required = false;
  }

  render() {
    return html`
      <div class="field">
        <input
          type=${this.controlType === 'password' && this.passwordVisible
            ? 'text'
            : this.controlType}
          id="${this.id}"
          name="${this.name}"
          placeholder="${this.placeholder}"
          class="${this.errored ? 'errored' : ''}"
          autocomplete="${this.disableAutocomplete ? 'off' : 'on'}"
          .value="${this.computeValue(this.value)}"
          ?disabled="${this.disabled}"
          ?readonly="${this.readonly}"
          ?required="${this.required}"
          @keypress="${this._lookForEnter}"
          @input="${this._input}"
          @change="${this._input}"
          @blur="${this.doBlur}"
          @focus="${this.doFocus}"
        />
        ${this.label ? html`<label for="${this.id}">${this.label}</label>` : ''}
        ${this.togglePassword
          ? html`<button
              type="button"
              class="input__password-toggle"
              @click=${this._handlePasswordToggle}
              tabindex="-1"
              aria-label=${this.passwordVisible
                ? 'hidePassword'
                : 'showPassword'}
            >
              ${this.passwordVisible
                ? html` <slot name="show-password-icon"></slot>`
                : html` <slot name="hide-password-icon"></slot>`}
            </button>`
          : ''}
      </div>
      <div class="err">
        <span class="input__error ${!this.error ? 'error__msg' : ''}">
          ${this.error}
        </span>
      </div>
    `;
  }

  _handlePasswordToggle() {
    this.passwordVisible = !this.passwordVisible;
  }

  _lookForEnter(e) {
    let keycode = e.keyCode ? e.keyCode : e.which;
    if (keycode == '13') {
      this.dispatchEvent(new CustomEvent('enter-pressed'));
    }
  }
  _input(e) {
    this.value = e.target.value;

    // Called whenever the value is updated.
    this._validate();
    if (!this.checkValidity()) this.error = this.validationMessage;
    this.internals_.setFormValue(this.value);
  }

  firstUpdated() {
    this._validate();
    this.internals_.setFormValue(this.value);
  }
  updated(changedProperties) {
    if (
      changedProperties.has('value') &&
      changedProperties.get('value') === ''
    ) {
      this._validate();
    }
  }

  _validate() {
    if (
      !this.matches(':disabled') &&
      this.hasAttribute('required') &&
      this.value.length === 0
    ) {
      this.internals_.setValidity(
        { customError: true },
        'This value is required'
      );
      return;
    }

    if (this.pattern) {
      let regex = new RegExp(this.pattern);
      if (regex.exec(this.value) === null) {
        this.internals_.setValidity({ customError: true }, this.patternerror);
        return;
      }

      // En caso de que el id sea confirm-password levanto el password de document y lo valido
      if (this.id === 'confirm-password') {
        const password = document.getElementById('password');
        if (password.value !== this.value) {
          this.internals_.setValidity(
            { customError: true },
            'La confirmación no coincide'
          );
          return;
        }
      }
    }

    this.error = '';
    this.internals_.setValidity({});
  }

  doFocus() {
    if (this.selectOnFocus) {
      this.el.select();
    }
  }

  get el() {
    return this.shadowRoot.querySelector('input');
  }

  computeValue(value) {
    return value;
  }

  // New lifecycle callbacks for form-associated custom elements.
  // eslint-disable-next-line no-unused-vars
  formAssociatedCallback(nullableForm) {
    // console.log('Form associated.');
  }

  // New lifecycle callback. This is called when ‘disabled’ attribute of
  // this element or an ancestor <fieldset> is updated.
  formDisabledCallback(disabled) {
    // Do something.  e.g. adding/removing ‘disabled’ content attributes
    // to/from form controls in this shadow tree.
    if (disabled) {
      // console.log('is disabled');
    }
  }

  // New lifecycle callback. This is called when the owner form is reset.
  formResetCallback() {
    this.value = this.getAttribute('value') || '';
    this._input();
  }

  // New lifecycle callback. This is called when the browser wants to
  // restore user-visible state.
  // eslint-disable-next-line no-unused-vars
  formStateRestoreCallback(state, mode) {
    this.value = state;
    this._input();
  }

  // Mostly boilerplate--add common form control
  // properties and methods. Many are simply wired
  // through to the ElementInternals object.

  get form() {
    return this.internals_.form;
  }

  // get name() {
  //   return this.getAttribute('name');
  // }

  get type() {
    return this.localName;
  }

  // // Form controls usually expose a "value" property
  // get value() {
  //   return this._input.value;
  //   // return this.shadowRoot.querySelector('input');
  // }
  // set value(v) {
  //   this._input.value = v;
  // }
  get validity() {
    return this.internals_.validity;
  }
  get validationMessage() {
    return this.internals_.validationMessage;
  }
  get willValidate() {
    return this.internals_.willValidate;
  }
  checkValidity() {
    return this.internals_.checkValidity();
  }
  reportValidity() {
    return this.internals_.reportValidity();
  }

  // // Standard custom element callback
  // // Here, we forward values like placeholder and disabled
  // // to the internal input
  // attributeChangedCallback(name, oldValue, newValue) {
  //   this.input_[name] = newValue;
  // }
}
customElements.define('lumau-input', LumauInput);

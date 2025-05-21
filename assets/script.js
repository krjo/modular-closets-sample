class MeasureSpaceDialog extends HTMLElement {
  constructor() {
    super();
    this._boundOpen = this._openDialog.bind(this);
    this._boundClose = this._closeDialog.bind(this);
    this._boundInput = this._handleInput.bind(this);
  }
  
  connectedCallback() {
    this.dialog = this.querySelector('[data-measure-dialog]');
    this.form = this.querySelector('form');
    this.submit = this.querySelector('button[type="submit"]');
    this.openButton = this.querySelector('[data-open-dialog]');
    this.closeButton = this.querySelectorAll('[data-close-dialog]');
    this.openButton.addEventListener('click', this._boundOpen);
    this.closeButton.forEach(button => button.addEventListener('click', this._boundClose));
    this.form.addEventListener('submit', event => event.preventDefault());
    this.form.addEventListener('input', this._boundInput);
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && this.dialog.hasAttribute('open')) {
        this._boundClose();
      }
    });
  }
  
  disconnectedCallback() {
    this.openButton.removeEventListener('click', this._boundOpen);
    this.closeButton.forEach(button => button.removeEventListener('click', this._boundClose));
    this.form.removeEventListener('change', this._boundInput);
  }

  _openDialog() {
    this.dialog.setAttribute('open', '');
    this.openButton.setAttribute('aria-expanded', 'true');
  }

  _closeDialog() {
    this.dialog.removeAttribute('open');
    this.openButton.setAttribute('aria-expanded', 'false');
  }

  _handleInput(event) {
    const textInputs = this.form.querySelectorAll('input[type="text"]');
    const allInputsFilled = Array.from(textInputs).every(input => input.value.trim() !== '');
      
    if (allInputsFilled) {
      this.submit.removeAttribute('disabled');
    } else {
      this.submit.setAttribute('disabled', '');
    }
  }

}

customElements.define('measure-space', MeasureSpaceDialog);
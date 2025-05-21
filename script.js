class MeasureSpaceDialog extends HTMLElement {
  constructor() {
    super();
    this._boundOpen = this._openDialog.bind(this);
    this._boundClose = this._closeDialog.bind(this);
  }
  
  connectedCallback() {
    this.dialog = this.querySelector('[data-measure-dialog]');
    this.form = this.querySelector('form');
    this.openButton = this.querySelector('[data-open-dialog]');
    this.closeButton = this.querySelectorAll('[data-close-dialog]');
    this.openButton.addEventListener('click', this._boundOpen);
    this.closeButton.forEach(button => button.addEventListener('click', this._boundClose));
    this.form.addEventListener('submit', event => event.preventDefault());
  }
  
  disconnectedCallback() {
    this.openButton.removeEventListener('click', this._boundOpen);
    this.closeButton.forEach(button => button.removeEventListener('click', this._boundClose));
  }

  _openDialog() {
    this.dialog.setAttribute('open', '');
    this.openButton.setAttribute('aria-expanded', 'true');
  }

  _closeDialog() {
    this.dialog.removeAttribute('open');
    this.openButton.setAttribute('aria-expanded', 'false');
  }

}

customElements.define('measure-space', MeasureSpaceDialog);
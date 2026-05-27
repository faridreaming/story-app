import { LitElement, html } from 'lit'
import { Modal } from 'bootstrap'

class CustomModal extends LitElement {
  static get properties() {
    return {
      modalId: { type: String },
      title: { type: String },
      message: { type: String },
      confirmText: { type: String },
    }
  }

  constructor() {
    super()
    this.modalId = 'appModal'
    this.title = 'Informasi'
    this.message = ''
    this.confirmText = 'OK'
    this._modal = null
  }

  createRenderRoot() {
    return this
  }

  firstUpdated() {
    const modalEl = this.querySelector(`#${this.modalId}`)
    if (modalEl) {
      this._modal = new Modal(modalEl)
    }
  }

  show() {
    if (this._modal) {
      this._modal.show()
    }
  }

  hide() {
    if (this._modal) {
      this._modal.hide()
    }
  }

  onConfirm() {
    this.dispatchEvent(
      new CustomEvent('modal-confirmed', { bubbles: true, composed: true }),
    )
    this.hide()
  }

  render() {
    return html`
      <div
        class="modal fade"
        id="${this.modalId}"
        tabindex="-1"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">${this.title}</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <p class="mb-0">${this.message}</p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                @click=${this.onConfirm}
              >
                ${this.confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    `
  }
}

customElements.define('custom-modal', CustomModal)

export { CustomModal }

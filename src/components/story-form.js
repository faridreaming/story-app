import { LitElement, html } from 'lit'

class StoryForm extends LitElement {
  static get properties() {
    return {
      loading: { type: Boolean },
    }
  }

  constructor() {
    super()
    this.loading = false
  }

  createRenderRoot() {
    return this
  }

  firstUpdated() {
    this.form = this.querySelector('form')
    this.form.addEventListener('submit', this.onSubmit.bind(this))
  }

  async onSubmit(e) {
    e.preventDefault()
    const form = e.target
    form.classList.remove('was-validated')
    if (!form.checkValidity()) {
      form.classList.add('was-validated')
      return
    }

    const description = form.querySelector('#description').value.trim()
    const photoInput = form.querySelector('#photo')
    const photoFile = photoInput.files[0]

    this.dispatchEvent(
      new CustomEvent('story-submitted', {
        detail: { description, photoFile },
        bubbles: true,
        composed: true,
      }),
    )
  }

  reset() {
    const form = this.querySelector('form')
    if (form) {
      form.reset()
      form.classList.remove('was-validated')
    }
  }

  render() {
    return html`
      <form class="needs-validation" novalidate>
        <div class="mb-3">
          <label for="description" class="form-label">Deskripsi</label>
          <textarea
            id="description"
            class="form-control"
            rows="4"
            required
          ></textarea>
          <div class="invalid-feedback">Deskripsi wajib diisi.</div>
        </div>

        <div class="mb-3">
          <label for="photo" class="form-label">Foto</label>
          <input
            id="photo"
            type="file"
            accept="image/*"
            class="form-control"
            required
          />
          <div class="invalid-feedback">Pilih file foto.</div>
        </div>

        <div class="d-flex justify-content-end">
          <button
            type="submit"
            class="btn btn-primary"
            ?disabled=${this.loading}
          >
            ${this.loading
              ? html`<span class="spinner-border spinner-border-sm me-2"></span
                  >Mengirim...`
              : 'Kirim'}
          </button>
        </div>
      </form>
    `
  }
}

customElements.define('story-form', StoryForm)

export { StoryForm }

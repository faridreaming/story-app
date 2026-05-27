import { LitElement, html } from 'lit'

class StoryForm extends LitElement {
  constructor() {
    super()
  }

  createRenderRoot() {
    return this
  }

  firstUpdated() {
    // enhance client-side bootstrap validation
    this.form = this.querySelector('form')
    this.form.addEventListener('submit', this.onSubmit.bind(this))
  }

  async readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  async onSubmit(e) {
    e.preventDefault()
    const form = e.target
    form.classList.remove('was-validated')
    // trigger browser validation
    if (!form.checkValidity()) {
      form.classList.add('was-validated')
      return
    }

    const description = form.querySelector('#description').value.trim()
    const photoInput = form.querySelector('#photo')
    let photoDataUrl = null

    if (photoInput.files && photoInput.files[0]) {
      try {
        photoDataUrl = await this.readFileAsDataUrl(photoInput.files[0])
      } catch (err) {
        console.error('Failed to read file', err)
      }
    }

    const payload = { description, photoDataUrl }

    this.dispatchEvent(
      new CustomEvent('story-submitted', {
        detail: payload,
        bubbles: true,
        composed: true,
      }),
    )

    // reset form
    form.reset()
    form.classList.remove('was-validated')
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
          <button type="submit" class="btn btn-primary">Kirim</button>
        </div>
      </form>
    `
  }
}

customElements.define('story-form', StoryForm)

export { StoryForm }

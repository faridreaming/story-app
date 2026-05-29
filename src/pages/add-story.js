import { LitElement, html } from 'lit'
import '../components/story-form.js'
import '../components/custom-modal.js'
import { addStory } from '../api/stories.js'

class AddStoryPage extends LitElement {
  createRenderRoot() {
    return this
  }

  firstUpdated() {
    this.addEventListener('story-submitted', (e) => this.onStorySubmitted(e))
    this.addEventListener('modal-confirmed', () => {
      window.location.hash = '#'
    })
  }

  async onStorySubmitted(e) {
    const { description, photoFile } = e.detail
    const storyForm = this.querySelector('story-form')

    if (storyForm) storyForm.loading = true

    try {
      const formData = new FormData()
      formData.append('description', description)
      formData.append('photo', photoFile)

      await addStory(formData)

      if (storyForm) {
        storyForm.loading = false
        storyForm.reset()
      }

      const modal = this.querySelector('custom-modal')
      if (modal && typeof modal.show === 'function') {
        modal.show()
      }
    } catch (err) {
      if (storyForm) storyForm.loading = false
      const message =
        err.response?.data?.message || 'Gagal menambahkan story. Coba lagi.'
      alert(message)
    }
  }

  render() {
    return html`
      <main class="container py-5">
        <div class="row justify-content-center">
          <div class="col-12 col-md-8">
            <div class="card p-4">
              <h3 class="mb-3">Tambah Story</h3>
              <story-form></story-form>
            </div>
            <custom-modal
              modalId="addStorySuccessModal"
              title="Story tersimpan"
              message="Story baru berhasil ditambahkan. Tekan OK untuk kembali ke dashboard."
              confirmText="OK"
            ></custom-modal>
          </div>
        </div>
      </main>
    `
  }
}

customElements.define('add-story-page', AddStoryPage)

export { AddStoryPage }

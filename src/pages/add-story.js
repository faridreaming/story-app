import { LitElement, html } from 'lit'
import '../components/story-form.js'
import '../components/custom-modal.js'

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
    const { description, photoDataUrl } = e.detail
    const newStory = {
      id: `local-${Date.now()}`,
      name: 'You',
      description,
      photoUrl: photoDataUrl,
      createdAt: new Date().toISOString(),
    }

    const existing = JSON.parse(localStorage.getItem('localStories') || '[]')
    existing.unshift(newStory)
    localStorage.setItem('localStories', JSON.stringify(existing))

    // notify dashboard
    window.dispatchEvent(
      new CustomEvent('local-story-added', { detail: newStory }),
    )

    const modal = this.querySelector('custom-modal')
    if (modal && typeof modal.show === 'function') {
      modal.show()
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

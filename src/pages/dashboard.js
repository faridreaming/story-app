import { LitElement, html } from 'lit'
import '../components/story-card.js'

class DashboardPage extends LitElement {
  static get properties() {
    return {
      stories: { type: Array },
      loading: { type: Boolean },
    }
  }

  constructor() {
    super()
    this.stories = []
    this.loading = true
  }

  createRenderRoot() {
    return this
  }

  connectedCallback() {
    super.connectedCallback()
    this.loadStories()
    // listen for stories added from the add page
    this._onLocalAdded = (e) => {
      this.stories = [e.detail, ...this.stories]
      this.requestUpdate()
    }
    window.addEventListener('local-story-added', this._onLocalAdded)
  }

  async loadStories() {
    try {
      const res = await fetch('/data/DATA.json')
      const json = await res.json()
      const remote = json.listStory || []
      const local = JSON.parse(localStorage.getItem('localStories') || '[]')
      // show local stories first
      this.stories = [...local, ...remote]
    } catch (err) {
      console.error('Failed to load stories', err)
      this.stories = []
    } finally {
      this.loading = false
      this.requestUpdate()
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    window.removeEventListener('local-story-added', this._onLocalAdded)
  }

  render() {
    return html`
      <main class="container py-5">
        <div class="row mb-4">
          <div class="col-12 d-flex align-items-center justify-content-between">
            <h2 class="h4 mb-0">Stories</h2>
            <a href="#add" class="btn btn-outline-primary">Tambah Story</a>
          </div>
        </div>

        ${this.loading
          ? html`<div class="text-center py-5">Memuat cerita...</div>`
          : html`
              <div class="row g-3">
                ${this.stories.map(
                  (s) => html`
                    <div class="col-12 col-md-6 col-lg-4">
                      <story-card
                        .name=${s.name}
                        .photoUrl=${s.photoUrl}
                        .description=${s.description}
                        .createdAt=${s.createdAt}
                      ></story-card>
                    </div>
                  `,
                )}
              </div>
            `}
      </main>
    `
  }
}

customElements.define('dashboard-page', DashboardPage)

export { DashboardPage }

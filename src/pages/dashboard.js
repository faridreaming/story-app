import { LitElement, html } from 'lit'
import '../components/story-card.js'
import { getStories } from '../api/stories.js'

class DashboardPage extends LitElement {
  static get properties() {
    return {
      stories: { type: Array },
      loading: { type: Boolean },
      error: { type: String },
    }
  }

  constructor() {
    super()
    this.stories = []
    this.loading = true
    this.error = ''
  }

  createRenderRoot() {
    return this
  }

  connectedCallback() {
    super.connectedCallback()
    this.loadStories()
    this._onLocalAdded = (e) => {
      this.stories = [e.detail, ...this.stories]
      this.requestUpdate()
    }
    window.addEventListener('local-story-added', this._onLocalAdded)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    window.removeEventListener('local-story-added', this._onLocalAdded)
  }

  async loadStories() {
    this.loading = true
    this.error = ''
    try {
      const data = await getStories()
      this.stories = data.listStory || []
    } catch (err) {
      if (err.response?.status === 401) {
        window.location.hash = '#login'
        return
      }
      this.error =
        err.response?.data?.message || 'Gagal memuat stories. Coba lagi.'
    } finally {
      this.loading = false
      this.requestUpdate()
    }
  }

  renderSkeletons() {
    return Array(6)
      .fill(0)
      .map(
        () => html`
          <div class="col-12 col-md-6 col-lg-4">
            <div class="card h-100 p-3">
              <div
                class="placeholder-glow"
                style="height: 180px; background: #e9ecef; border-radius: 0.5rem;"
              >
                <span class="placeholder w-100 h-100 d-block"></span>
              </div>
              <div class="card-body px-0 pb-0">
                <h5 class="card-title placeholder-glow">
                  <span class="placeholder col-6"></span>
                </h5>
                <p class="card-text placeholder-glow">
                  <span class="placeholder col-12"></span>
                  <span class="placeholder col-10"></span>
                  <span class="placeholder col-8"></span>
                </p>
              </div>
            </div>
          </div>
        `,
      )
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

        ${this.error
          ? html`
              <div class="alert alert-danger d-flex align-items-center gap-3">
                <span>${this.error}</span>
                <button
                  class="btn btn-sm btn-outline-danger ms-auto"
                  @click=${this.loadStories}
                >
                  Coba Lagi
                </button>
              </div>
            `
          : ''}

        <div class="row g-3">
          ${this.loading
            ? this.renderSkeletons()
            : this.stories.map(
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
      </main>
    `
  }
}

customElements.define('dashboard-page', DashboardPage)

export { DashboardPage }

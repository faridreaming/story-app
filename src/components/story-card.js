import { LitElement, html } from 'lit'
import { formatDate } from '../utils/date-formatter.js'

class StoryCard extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      photoUrl: { type: String },
      description: { type: String },
      createdAt: { type: String },
    }
  }

  constructor() {
    super()
    this.name = ''
    this.photoUrl = ''
    this.description = ''
    this.createdAt = ''
    this.locale = localStorage.getItem('lang') || 'id'
  }

  createRenderRoot() {
    // Disable shadow DOM so Bootstrap styles apply
    return this
  }

  connectedCallback() {
    super.connectedCallback()
    this._onLang = (e) => {
      this.locale = e?.detail?.lang || localStorage.getItem('lang') || 'id'
      this.requestUpdate()
    }
    window.addEventListener('app-lang-changed', this._onLang)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    window.removeEventListener('app-lang-changed', this._onLang)
  }

  render() {
    const date = this.createdAt ? formatDate(this.createdAt, this.locale) : ''
    return html`
      <article class="card h-100 shadow-sm">
        ${this.photoUrl
          ? html`<img
              src="${this.photoUrl}"
              class="card-img-top"
              alt="${this.name}"
            />`
          : ''}
        <div class="card-body d-flex flex-column">
          <div class="mb-2">
            <h5 class="card-title mb-0">${this.name}</h5>
            <small class="text-muted">${date}</small>
          </div>

          <p class="card-text text-truncate-3 mb-3">${this.description}</p>

          <div class="mt-auto">
            <a href="#" class="stretched-link text-decoration-none"
              >Baca selengkapnya</a
            >
          </div>
        </div>
      </article>
    `
  }
}

customElements.define('story-card', StoryCard)

export { StoryCard }

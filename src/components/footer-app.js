import { LitElement, html } from 'lit'

class FooterApp extends LitElement {
  createRenderRoot() {
    return this
  }

  render() {
    return html`
      <footer class="bg-light mt-5 py-4">
        <div
          class="container d-flex flex-column flex-md-row justify-content-between align-items-center"
        >
          <div class="mb-2 mb-md-0">
            <strong>Story App</strong> &middot; Built with ❤️
          </div>
          <div>
            <a href="#" class="me-2 text-decoration-none">Home</a>
            <a href="#about" class="me-2 text-decoration-none">About</a>
            <a href="#add" class="text-decoration-none">Add Story</a>
          </div>
        </div>
      </footer>
    `
  }
}

customElements.define('footer-app', FooterApp)

export { FooterApp }

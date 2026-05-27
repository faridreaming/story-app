import { LitElement, html } from 'lit'
import '../components/dev-badge.js'
import '../components/theme-toggle.js'

class AboutDev extends LitElement {
  createRenderRoot() {
    return this
  }

  render() {
    return html`
      <main class="container py-5">
        <div class="row justify-content-center">
          <div class="col-12 col-md-8">
            <div class="card p-4 mb-4 card-custom">
              <div
                class="d-flex align-items-center justify-content-between mb-3"
              >
                <div class="d-flex align-items-center gap-3">
                  <h3 class="mb-0">About the Developer</h3>
                  <dev-badge></dev-badge>
                </div>
                <div class="d-flex align-items-center gap-2">
                  <span class="badge text-bg-primary">Lit + Bootstrap</span>
                  <theme-toggle></theme-toggle>
                </div>
              </div>
              <p>
                Halo! Saya adalah developer pembuat aplikasi ini. Proyek ini
                dibuat untuk memenuhi kriteria submission: menggunakan data
                dummy, Lit components, dan Sass modular dengan Bootstrap.
              </p>
              <ul class="list-group list-group-flush">
                <li class="list-group-item px-0">
                  <strong>Nama:</strong> Muhammad Farid Yamin
                </li>
                <li class="list-group-item px-0">
                  <strong>Email:</strong> muhammad.farid.yamin@gmail.com
                </li>
                <li class="list-group-item px-0">
                  <strong>Peran:</strong> Frontend Developer
                </li>
              </ul>
            </div>
            <footer-app></footer-app>
          </div>
        </div>
      </main>
    `
  }
}

customElements.define('about-dev', AboutDev)

export { AboutDev }

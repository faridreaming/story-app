import { LitElement, html } from 'lit'
import { id as idLocale } from '../locales/id.js'
import { en as enLocale } from '../locales/en.js'
import { ja as jaLocale } from '../locales/ja.js'
import { zh as zhLocale } from '../locales/zh.js'

class NavBar extends LitElement {
  constructor() {
    super()
    this.lang = localStorage.getItem('lang') || 'id'
    this.locales = { id: idLocale, en: enLocale, ja: jaLocale, zh: zhLocale }
  }

  createRenderRoot() {
    // Disable shadow DOM so Bootstrap styles apply
    return this
  }

  get t() {
    return this.locales[this.lang] || this.locales.id
  }

  changeLang(e) {
    const newLang = e.target.value
    if (!newLang) return
    this.lang = newLang
    localStorage.setItem('lang', newLang)
    // Notify app of language change
    window.dispatchEvent(
      new CustomEvent('app-lang-changed', { detail: { lang: newLang } }),
    )
    this.requestUpdate()
  }

  render() {
    const t = this.t
    return html`
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">${t.app.title}</a>

          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div
            class="offcanvas offcanvas-end"
            tabindex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
                ${t.app.title}
              </h5>
              <button
                type="button"
                class="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div class="offcanvas-body">
              <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li class="nav-item">
                  <a class="nav-link" href="#">${t.nav.home}</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#add">${t.nav.addStory}</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#about">${t.nav.aboutDev}</a>
                </li>
              </ul>

              <hr />

              <div class="d-flex align-items-center">
                <label for="langSelect" class="me-2 mb-0"
                  >${t.nav.language}</label
                >
                <select
                  id="langSelect"
                  class="form-select form-select-sm"
                  @change="${this.changeLang.bind(this)}"
                >
                  <option value="id" ?selected=${this.lang === 'id'}>
                    Bahasa
                  </option>
                  <option value="en" ?selected=${this.lang === 'en'}>
                    English
                  </option>
                  <option value="ja" ?selected=${this.lang === 'ja'}>
                    日本語
                  </option>
                  <option value="zh" ?selected=${this.lang === 'zh'}>
                    中文
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </nav>
    `
  }
}

customElements.define('nav-bar', NavBar)

export { NavBar }

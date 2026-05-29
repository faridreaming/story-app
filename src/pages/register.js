import { LitElement, html } from 'lit'
import { register } from '../api/auth.js'

class RegisterPage extends LitElement {
  static get properties() {
    return {
      loading: { type: Boolean },
      error: { type: String },
    }
  }

  constructor() {
    super()
    this.loading = false
    this.error = ''
  }

  createRenderRoot() {
    return this
  }

  async onSubmit(e) {
    e.preventDefault()
    const form = e.target
    if (!form.checkValidity()) {
      form.classList.add('was-validated')
      return
    }

    this.loading = true
    this.error = ''

    const name = form.querySelector('#name').value.trim()
    const email = form.querySelector('#email').value.trim()
    const password = form.querySelector('#password').value

    try {
      await register(name, email, password)
      window.location.hash = '#login'
    } catch (err) {
      this.error = err.response?.data?.message || 'Registrasi gagal. Coba lagi.'
    } finally {
      this.loading = false
    }
  }

  render() {
    return html`
      <main class="container py-5">
        <div class="row justify-content-center">
          <div class="col-12 col-md-5">
            <div class="card p-4 shadow-sm">
              <h3 class="mb-4">Daftar</h3>

              ${this.error
                ? html`<div class="alert alert-danger">${this.error}</div>`
                : ''}

              <form
                class="needs-validation"
                novalidate
                @submit=${this.onSubmit}
              >
                <div class="mb-3">
                  <label for="name" class="form-label">Nama</label>
                  <input id="name" type="text" class="form-control" required />
                  <div class="invalid-feedback">Nama wajib diisi.</div>
                </div>

                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input
                    id="email"
                    type="email"
                    class="form-control"
                    required
                  />
                  <div class="invalid-feedback">Email wajib diisi.</div>
                </div>

                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input
                    id="password"
                    type="password"
                    class="form-control"
                    minlength="8"
                    required
                  />
                  <div class="invalid-feedback">
                    Password wajib diisi dan minimal 8 karakter.
                  </div>
                </div>

                <div class="d-grid mb-3">
                  <button
                    type="submit"
                    class="btn btn-primary"
                    ?disabled=${this.loading}
                  >
                    ${this.loading
                      ? html`<span
                            class="spinner-border spinner-border-sm me-2"
                          ></span
                          >Mendaftar...`
                      : 'Daftar'}
                  </button>
                </div>

                <p class="text-center mb-0">
                  Sudah punya akun?
                  <a href="#login">Masuk di sini</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>
    `
  }
}

customElements.define('register-page', RegisterPage)

export { RegisterPage }

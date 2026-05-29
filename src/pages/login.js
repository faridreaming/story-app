import { LitElement, html } from 'lit'
import { login } from '../api/auth.js'
import { saveSession } from '../utils/auth.js'

class LoginPage extends LitElement {
  static get properties() {
    return {
      loading: { type: Boolean },
      error: { type: String },
      showPassword: { type: Boolean },
    }
  }

  constructor() {
    super()
    this.loading = false
    this.error = ''
    this.showPassword = false
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

    const email = form.querySelector('#email').value.trim()
    const password = form.querySelector('#password').value

    try {
      const data = await login(email, password)
      saveSession(data.loginResult)
      window.dispatchEvent(new CustomEvent('app-auth-changed'))
      window.location.hash = '#'
    } catch (err) {
      this.error =
        err.response?.data?.message ||
        'Login gagal. Periksa kembali kredensialmu.'
    } finally {
      this.loading = false
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword
  }

  render() {
    return html`
      <main class="container py-5">
        <div class="row justify-content-center">
          <div class="col-12 col-md-5">
            <div class="card p-4 shadow-sm">
              <h3 class="mb-4">Login</h3>

              ${this.error
                ? html`<div class="alert alert-danger">${this.error}</div>`
                : ''}

              <form
                class="needs-validation"
                novalidate
                @submit=${this.onSubmit}
              >
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
                  <div class="input-group">
                    <input
                      id="password"
                      type=${this.showPassword ? 'text' : 'password'}
                      class="form-control"
                      minlength="8"
                      required
                    />
                    <button
                      class="btn btn-outline-secondary"
                      type="button"
                      @click=${this.togglePassword}
                      title=${this.showPassword
                        ? 'Sembunyikan password'
                        : 'Tampilkan password'}
                    >
                      ${this.showPassword ? '🙈' : '👁️'}
                    </button>
                    <div class="invalid-feedback">
                      Password wajib diisi dan minimal 8 karakter.
                    </div>
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
                          >Masuk...`
                      : 'Masuk'}
                  </button>
                </div>

                <p class="text-center mb-0">
                  Belum punya akun?
                  <a href="#register">Daftar di sini</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>
    `
  }
}

customElements.define('login-page', LoginPage)

export { LoginPage }

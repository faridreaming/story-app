import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './components/nav-bar.js'
import './pages/dashboard.js'
import './pages/add-story.js'
import './pages/about-dev.js'
import './pages/login.js'
import './pages/register.js'
import './components/footer-app.js'
import './styles/main.scss'
import { isLoggedIn } from './utils/auth.js'

const app = document.querySelector('#app')

app.innerHTML = `
  <nav-bar></nav-bar>
  <div id="page"></div>
`

const PUBLIC_ROUTES = ['#login', '#register']

function renderRoute() {
  const page = app.querySelector('#page')
  const hash = window.location.hash || '#'

  const isPublic = PUBLIC_ROUTES.some((r) => hash.startsWith(r))

  if (!isLoggedIn() && !isPublic) {
    window.location.hash = '#login'
    return
  }

  if (hash.startsWith('#login')) {
    page.innerHTML = '<login-page></login-page>'
  } else if (hash.startsWith('#register')) {
    page.innerHTML = '<register-page></register-page>'
  } else if (hash.startsWith('#add')) {
    page.innerHTML = '<add-story-page></add-story-page>'
  } else if (hash.startsWith('#about')) {
    page.innerHTML = '<about-dev></about-dev>'
  } else {
    page.innerHTML = '<dashboard-page></dashboard-page>'
  }
}

window.addEventListener('hashchange', renderRoute)
window.addEventListener('app-auth-changed', renderRoute)
renderRoute()

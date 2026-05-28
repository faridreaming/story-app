const TOKEN_KEY = 'auth_token'
const USER_KEY = 'auth_user'

export function saveSession(loginResult) {
  localStorage.setItem(TOKEN_KEY, loginResult.token)
  localStorage.setItem(
    USER_KEY,
    JSON.stringify({
      userId: loginResult.userId,
      name: loginResult.name,
    }),
  )
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function getUser() {
  const raw = localStorage.getItem(USER_KEY)
  return raw ? JSON.parse(raw) : null
}

export function isLoggedIn() {
  return !!getToken()
}

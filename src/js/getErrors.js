export function getError(text, rules) {
  if (rules === 'email') {
    const req = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return !req.test(text) ? 'Неверный формат email' : ''
  }
  if (rules === 'password') {
    return !(text.length > 5 && text.length < 16) ? 'Пароль должен быть от 6 до 15 символов' : ''
  }
  if (rules === 'login') {
    return !(text.length > 2 && text.length < 10) ? 'Логин должен быть от 3 до 10 символов' : ''
  }
  return ''
}

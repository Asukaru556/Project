import { getError } from '@/js/getErrors.js'

export function validation(Form) {
  const arr = []
  Form.forEach((el) => {
    const message = getError(el.model, el.rules)
    if (message.length) {
      el.error = message
      arr.push(message)
    } else if (el.rules !== 'confirm') {
      el.error = ''
    }
  })
  return {
    data: Form,
    valid: !arr.length,
  }
}

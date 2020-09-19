'use strict'

class Login {
  get rules () {
    return {
      // validation rules
      email: 'required|email',
      password: 'required'
    }
  }

  get messages() {
    return {
      'email.required': 'Email obrigatório',
      'email.email': 'Email inválido',
      'password.required': 'Senha obrigatória'
    }
  }
}

module.exports = Login

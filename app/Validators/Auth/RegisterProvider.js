'use strict'

class RegisterProvider {
  get rules () {
    return {
      // validation rules
      first_name: 'required',
      last_name: 'required',
      email: 'required|email|unique:providers,email',
      password: 'required|confirmed', //confirmed will work with the param confirmed_password just for check equals to password
      birth_date: 'required',
      gender: 'required',
      document: 'required',
      phone: 'required',
      zip_code: 'required',
      address_street: 'required',
      address_number: 'required',
      address_neighborhood: 'required',
      address_city: 'required',
      address_state: 'required'
    }
  }

  get messages() {
    return {
      'first_name.required': 'Nome é obrigatório',
      'last_name.required': 'Sobrenome é obrigatório',
      'email.required': 'Email é obrigatório',
      'email.email': 'Email inválido',
      'email.unique': 'O email já está em uso',
      'password.required': 'Senha é obrigatória',
      'password.confirmed': 'As senhas não são iguais',
      'birth_date.required': 'Data de aniversário é obrigatória',
      'gender.required': 'Gênero obrigatório',
      'document.required': 'Documento é obrigatório',
      'phone.required': 'Telefone é obrigatório',
      'zip_code.required' : 'Cep é obrigatório',
      'address_street.required': 'Rua é obrigatório',
      'address_number.required': 'Número do endereço é obrigatório',
      'address_city.required': 'Cidade é obrigatório',
      'address_state.required': 'Estado é obrigatório'
    }
  }
}

module.exports = RegisterProvider

'use strict'

class AdminStoreCategory {
  get rules () {
    return {
      // validation rules
      name: 'required',
      description: 'required'
    }
  }

  get messages() {
    return {
      'name.required': 'Nome da categoria é obrigatório',
      'description.required': 'Descrição da categoria é obrigatório'
    }
  }
}

module.exports = AdminStoreCategory

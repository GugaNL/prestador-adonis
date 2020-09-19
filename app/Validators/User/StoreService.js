'use strict'

class StoreService {
  get rules () {
    return {
      // validation rules
      name: 'required',
      description: 'required',
      value: 'required',
      initial_datetime: 'required',
      final_datetime: 'required',
      category_id: 'required',
      user_id: 'required'
    }
  }

  get messages() {
    return {
      'name.required': 'Nome do serviço obrigatório',
      'description.required': 'Descrição do serviço obrigatório',
      'value.required': 'Valor do serviço obrigatório',
      'initial_datetime.required': 'Data de início obrigatório',
      'final_datetime.required': 'Data do fim obrigatório',
      'category_id.required': 'Categoria obrigatória',
      'user_id.required': 'Usuário obrigatório'
    }
  }
}

module.exports = StoreService

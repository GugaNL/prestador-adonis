'use strict'

class StoreUser {
  get rules () {
    let userId = this.ctx.params.id
    let rule = ''

    if (userId) { //Means that want update a user
      rule = `unique:users,email,id,${userId}` 
    } else { //Means that want register a user
      rule = 'unique:users,email|required'
    }

    return {
      // validation rules
      first_name: 'required',
      last_name: 'required',
      email: rule,
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
}

module.exports = StoreUser

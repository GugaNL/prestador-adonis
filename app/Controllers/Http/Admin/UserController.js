'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const User = use('App/Models/User')
const Provider = use('App/Models/Provider')
const Role = use('Role')
const Database = use('Database')
const Transformer = use('App/Transformers/Admin/UserTransformer')

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, pagination, transform }) {
    const { id, token, name } = request.all()
    let user = await User.findOrFail(id)

    if (user.token == token) {
      const roles = await user.getRoles() //Take the role for validate
      if (roles.includes('admin', 'manager')) {
        try {
          const query = User.query()
          if (name) {
            query.where('first_name', 'LIKE', `%${name}%`)
            query.orWhere('last_name', 'LIKE', `%${name}%`)
            query.orWhere('email', 'LIKE', `%${name}%`)
          }
          var users = await query.paginate(pagination.page, pagination.limit)
          users = await transform.paginate(users, Transformer)
          return response.send({ success: true, users })
        } catch (error) {
          return response.send({ success: false, message: 'Falha ao tentar listar usuários' })
        }
      } else {
        return response.send({ success: false, message: 'Você não tem permissão' })
      }
    } else {
      return response.send({ success: false, message: 'Falha na autenticação' })
    }
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const trx = await Database.beginTransaction()

    try {
      const {
        first_name,
        last_name,
        email,
        password,
        birth_date,
        gender,
        document,
        phone,
        zip_code,
        address_street,
        address_number,
        address_neighborhood,
        address_complement,
        address_reference,
        address_city,
        address_state,
        //image_id
      } = request.all()

      const user = await User.create({
        first_name,
        last_name,
        email,
        password,
        birth_date,
        gender,
        document,
        phone,
        zip_code,
        address_street,
        address_number,
        address_neighborhood,
        address_complement,
        address_reference,
        address_city,
        address_state,
        //image_id
        status: 'pending'
      }, trx)

      const userRole = await Role.findBy('slug', 'client') //Take the role for set in the user
      await user.roles().attach([userRole.id], null, trx) //Set role in the user
      await trx.commit() //Commit the transation
      return response.status(201).send({ data: user })
    } catch (error) {
      await trx.rollback()
      return response.status(400).send({ message: 'Erro ao tentar cadastrar usuário' })
    }
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, transform }) {
    const { id, token, user_id } = request.all()

    const adminUser = await User.findOrFail(id)
    if (adminUser.token == token) {
      try {
        let user = await User.findOrFail(user_id)
        user = await transform.item(user, Transformer)
        return response.send({ success: true, user })
      } catch (error) {
        return response.send({ success: false, message: 'Falha ao tentar buscar usuário' })
      }
    } else {
      return response.send({ success: false, message: 'Falha na autenticação' })
    }
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    try {
      const {
        id,
        first_name,
        last_name,
        email,
        password,
        birth_date,
        gender,
        document,
        phone,
        zip_code,
        address_street,
        address_number,
        address_neighborhood,
        address_complement,
        address_reference,
        address_city,
        address_state,
        //image_id
      } = request.all()

      const user = await User.findOrFail(id)
      user.merge({
        first_name,
        last_name,
        email,
        password,
        birth_date,
        gender,
        document,
        phone,
        zip_code,
        address_street,
        address_number,
        address_neighborhood,
        address_complement,
        address_reference,
        address_city,
        address_state,
        //image_id
      })

      await user.save()
      return response.send({ success: true, data: user })
    } catch (error) {
      return response.send({ success: false, message: 'Falha ao tentar atualizar usuário' })
    }
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const { id, token, user_id } = request.all()
    const adminUser = await User.findOrFail(id)

    if (adminUser.token == token) {
      try {
        const user = await User.findOrFail(user_id)
        await user.delete()
        return response.send({ success: true })
      } catch (error) {
        return response.status(500).send({ success: false, message: 'Falha ao tentar deletar usuário' })
      }
    } else {
      return response.send({ success: false, message: 'Falha na autenticação' })
    }
  }


  /**
   * Change status
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async changeStatusUser({ params, request, response }) {
    const { id, token, person_id, status, type } = request.all()
    const adminUser = await User.findOrFail(id)

    if (adminUser.token == token) {
      try {
        let person = type === 'user' ? await User.findOrFail(person_id) : await Provider.findOrFail(person_id)
        person.merge({ status })
        person.save()
        return response.send({ success: true, message: 'Status alterado com sucesso' })
      } catch (error) {
        return response.status(500).send({ success: false, message: 'Falha ao tentar alterar status' })
      }
    } else {
      return response.send({ success: false, message: 'Falha na autenticação' })
    }
  }
  
}

module.exports = UserController

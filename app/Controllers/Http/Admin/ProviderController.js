'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Provider = use('App/Models/Provider')
const User = use('App/Models/User')
const Transform = use('App/Transformers/Admin/ProviderTransformer')
const Database = use('Database')
const Role = use('Role')

/**
 * Resourceful controller for interacting with providers
 */
class ProviderController {
  /**
   * Show a list of all providers.
   * GET providers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, pagination, transform }) {
    const { id, token, first_name, last_name, email } = request.all()
    const user = await User.findOrFail(id)

    if (user.token == token) {
      const roles = await user.getRoles() //Take the role for validate
      if (roles.includes('admin', 'manager')) {
        try {
          const query = Provider.query()

          if (first_name) {
            query.where('first_name', 'LIKE', `%${first_name}%`)
          }
          if (last_name) {
            query.orWhere('last_name', 'LIKE', `%${last_name}%`)
          }
          if (email) {
            query.orWhere('email', 'LIKE', `%${email}%`)
          }

          let providers = await query.paginate(pagination.page, pagination.limit)
          providers = await transform.paginate(providers, Transform)
          
          return response.send({ success: true, providers })
        } catch (error) {
          return response.send({ success: false, message: 'Falha ao tentar listar prestadores' })
        }
      } else {
        return response.send({ success: false, message: 'Você não tem permissão' })
      }
    } else {
      return response.send({ success: false, message: 'Falha na autenticação' })
    }
  }

  /**
   * Create/save a new provider.
   * POST providers
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
        category_id
        //image_id
      } = request.all()

      const provider = await Provider.create({
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
        status: 'pending',
        category_id
      }, trx)

      const providerRole = await Role.findBy('slug', 'client') //Take the role for set in the provider
      await provider.roles().attach([providerRole.id], null, trx) //Set role in the provider
      await trx.commit() //Commit the transation
      return response.status(201).send({ success: true, data: provider })
    } catch (error) {
      await trx.rollback()
      return response.status(400).send({ success: false, message: 'Erro ao tentar cadastrar prestador' })
    }
  }

  /**
   * Display a single provider.
   * GET providers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, transform }) {
    const { id, token, provider_id } = request.all()
    const user = await User.findOrFail(id)

    if (user.token == token) {
      try {
        let provider = await Provider.findOrFail(provider_id)
        provider = await transform.item(provider, Transform)
        return response.send({ success: true, provider })
      } catch (error) {
        return response.send({ success: false, message: 'Falha ao tentar buscar prestador' })
      }
    } else {
      return response.send({ success: false, message: 'Falha na autenticação' })
    }
  }

  /**
   * Update provider details.
   * PUT or PATCH providers/:id
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
        category_id
        //image_id
      } = request.all()

      const provider = await Provider.findOrFail(id)
      provider.merge({
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
        category_id
        //image_id
      })

      await provider.save()
      return response.send({ success: true, data: provider })
    } catch (error) {
      return response.send({ success: false, message: 'Falha ao tentar atualizar prestador' })
    }
  }

  /**
   * Delete a provider with id.
   * DELETE providers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const { id, token, provider_id } = request.all()
    const user = await User.findOrFail(id)

    if (user.token == token) {
      try {
        const provider = await Provider.findOrFail(provider_id)
        await provider.delete()
        return response.send({ success: true })
      } catch (error) {
        return response.status(500).send({ success: false, message: 'Falha ao tentar deletar prestador' })
      }
    } else {
      return response.send({ success: false, message: 'Falha na autenticação' })
    }
  }
}

module.exports = ProviderController

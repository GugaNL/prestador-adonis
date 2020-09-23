'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Service = use('App/Models/Service')
const User = use('App/Models/User')
const Transformer = use('App/Transformer/Admin/ServiceTransformer')

/**
 * Resourceful controller for interacting with services
 */
class ServiceController {
  /**
   * Show a list of all services.
   * GET services
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
      try {
        const query = Service.query()
        if (name) {
          query.where('name', 'LIKE', `%${name}%`)
        }
        var services = await query.paginate(pagination.page, pagination.limit)
        services = await transform.paginate(services, Transformer)
        return response.send({ success: true, data: services })
      } catch (error) {
        return response.send({ success: false, message: 'Falha ao tentar listar serviços' })
      }
    } else {
      return response.send({ success: false, message: 'Falha na autenticação' })
    }
  }

  /**
   * Create/save a new service.
   * POST services
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
  }

  /**
   * Display a single service.
   * GET services/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, transform }) {
    const { id, token, service_id } = request.all()
    let user = await User.findOrFail(id)

    if (user.token == token) {
      try {
        var service = await Service.findOrFail(service_id)
        service = await transform.item(service, Transformer)
        return response.send({ success: true, data: service })
      } catch (error) {
        return response.send({ success: false, message: 'Falha ao tentar exibir serviço' })
      }
    } else {
      return response.send({ success: false, message: 'Falha na autenticação' })
    }
  }

  /**
   * Update service details.
   * PUT or PATCH services/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a service with id.
   * DELETE services/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = ServiceController

'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Service = use('App/Models/Service')
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
  async index({ request, response, view, pagination, transform }) {
    try {
      const name = request.input('name')
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
  }

  /**
   * Create/save a new service.
   * POST services
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
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
  async show({ params, request, response, view, transform }) {
    try {
      const id = request.input('id')
      var service = await Service.findOrFail(id)
      service = await transform.item(service, Transformer)
      return response.send({ success: true, data: service })
    } catch (error) {
      return response.send({ success: false, message: 'Falha ao tentar exibir serviço' })
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
  async update ({ params, request, response }) {
  }

  /**
   * Delete a service with id.
   * DELETE services/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ServiceController

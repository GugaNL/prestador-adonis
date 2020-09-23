'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Service = use('App/Models/Service')
const Provider = use('App/Models/Provider')
const Transformer = use('App/Transformers/Admin/ServiceTransformer')

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
    let provider = await Provider.findOrFail(id)

    if (provider.token == token) {
      try {
        const query = Service.query()
        if (name) {
          query.where('name', 'LIKE', `%${name}%`)
        }
        query.where('provider_id', '').orWhere('provider_id', null)
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
    let provider = await Provider.findOrFail(id)

    if (provider.token == token) {
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


  /**
   * Accept service
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async acceptService({ params, request, response }) {
    const { id, token, service_id } = request.all()
    const provider = await Provider.findOrFail(id)

    if (provider.token == token) {
      try {
        var service = await Service.findOrFail(service_id)
        service.merge({ provider_id: id })
        await service.save()
        return response.send({ success: true, service })
      } catch (error) {
        return response.send({ success: false, message: 'Falha ao tentar aceitar o serviço' })
      }
    } else {
      return response.send({ success: false, message: 'Falha na autenticação' })
    }
  }


  /**
   * Cancel service
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async cancelService({ params, request, response }) {
    const { id, token, service_id } = request.all()
    const provider = await Provider.findOrFail(id)

    if (provider.token == token) {
      try {
        let service = await Service.findOrFail(service_id)
        service.merge({ provider_id: '' })
        service.save()
        return response.send({ success: true, message: 'Serviço cancelado pelo prestador' })
      } catch (error) {
        return response.send({ success: false, message: 'Falha ao tentar cancelar o serviço pelo prestador' })
      }
    } else {
      return response.send({ success: false, message: 'Falha na autenticação' })
    }
  }
}

module.exports = ServiceController

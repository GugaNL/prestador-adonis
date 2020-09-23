'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Service = use('App/Models/Service')
const User = use('App/Models/User')
const DesiredService = use('App/Models/DesiredService')
const Database = use('Database')
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
    try {
      const { id, token, name } = request.all()
      let user = await User.findOrFail(id)

      if (user.token == token) {
        try {
          const query = Service.query()
          if (name) {
            query.where('name', 'LIKE', `%${name}%`)
          }
          query.where('user_id', user.id)
          var services = await query.paginate(pagination.page, pagination.limit)
          services = await transform.paginate(services, Transformer)
          return response.send({ success: true, data: services })
        } catch (error) {
          return response.send({ success: false, message: 'Falha ao tentar listar serviços' })
        }
      } else {
        return response.send({ success: false, message: 'Falha na autenticação' })
      }
    } catch (error) {
      return response.send({ success: false, message: 'Falha na operação' })
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
  async store({ request, response, transform }) {
    const { id, token, name, description, value, initial_datetime, final_datetime, status, category_id, provider_id } = request.all()
    let user = await User.findOrFail(id)

    if (user.token == token) {
      try {
        var service = await Service.create({ name, description, value, initial_datetime, final_datetime, status, category_id, user_id: user.id, provider_id })
        service = await transform.item(service, Transformer)
        return response.status(201).send({ success: true, data: service })
      } catch (error) {
        return response.status(400).send({ success: false, message: 'Erro ao tentar cadastrar serviço' })
      }
    } else {
      return response.send({ success: false, message: 'Falha na autenticação' })
    }
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
  async update({ params, request, response, transform }) {
    const { id, token, service_id, name, description, value, initial_datetime, final_datetime, status, category_id, user_id, provider_id } = request.all()
    let user = await User.findOrFail(id)

    if (user.token == token) {
      try {
        var service = await Service.findOrFail(service_id)
        service.merge({ name, description, value, initial_datetime, final_datetime, status, category_id, user_id, provider_id })
        await service.save()
        service = await transform.item(service, Transformer)
        return response.send({ success: true, data: service })
      } catch (error) {
        return response.send({ success: false, message: 'Falha ao tentar atualizar serviço' })
      }
    } else {
      return response.send({ success: false, message: 'Falha na autenticação' })
    }
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
    const { id, token, service_id } = request.all()
    let user = await User.findOrFail(id)

    if (user.token == token) {
      try {
        const service = await Service.findOrFail(service_id)
        await service.delete()
        return response.send({ success: true })
      } catch (error) {
        return response.status(500).send({ success: false, message: 'Falha ao tentar deletar serviço' })
      }
    } else {
      return response.send({ success: false, message: 'Falha na autenticação' })
    }
  }


  /**
   * List interesting providers
   * 
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async listInterestingProviders({ params, request, response, pagination }) {
    const { id, token, service_id } = request.all()
    let user = await User.findOrFail(id)

    if (user.token == token) {
      try {
        const service = await Service.findOrFail(service_id)

        const query = DesiredService.query().where('service_id', service.id)
        let interestingProviders = await query.paginate(pagination.page, pagination.limit)

        return response.send({ success: true, data: interestingProviders })
      } catch (error) {
        return response.send({ success: false, message: 'Falha ao tentar listar prestadores interessados' })
      }
    } else {
      return response.send({ success: false, message: 'Falha na autenticação' })
    }
  }


  /**
   * Confirm service
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async confirmService({ params, request, response }) {

    const trx = await Database.beginTransaction()

    try {
      const { id, token, desired_id } = request.all()
      let user = await User.findOrFail(id)

      if (user.token == token) {
        try {
          let desiredService = await DesiredService.findOrFail(desired_id)
          let service = await Service.findOrFail(desiredService.service_id)
          service.merge({ provider_id: desiredService.provider_id })
          await service.save()
          await DesiredService.query().where('service_id', service.id).delete()
          await trx.commit() //Commit the transation
          return response.send({ success: true, message: 'O serviço foi confirmado com sucesso' })
        } catch (error) {
          return response.send({ success: false, message: 'Falha ao tentar confirmar o serviço' })
        }
      } else {
        return response.send({ success: false, message: 'Falha na autenticação' })
      }
    } catch (error) {
      await trx.rollback()
      return response.send({ success: false, message: 'Falha na operação' })
    }


  }
}

module.exports = ServiceController

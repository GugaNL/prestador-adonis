'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Category = use('App/Models/Category')
const User = use('App/Models/User')
const Provider = use('App/Models/Provider')
const Service = use('App/Models/Service')

class StatController {
    /*
    * @param {object} ctx
    * @param {Request} ctx.request
    * @param {Response} ctx.response
    * 
    * */
    async listStats({ request, response }) {
        const { id, token } = request.all()
        let user = await User.findOrFail(id)

        if (user.token == token) {
            try {
                const totalUsers = await User.getCount()
                const totalProviders = await Provider.getCount()
                const totalCategories = await Category.getCount()
                const totalServices = await Service.getCount()
                const totalValues = { totalUsers, totalProviders, totalCategories, totalServices  }

                return response.send({ success: true, totalValues })
            } catch (error) {
                return response.send({ success: false, message: 'Falha ao tentar listar quantidades' })
            }
        } else {
            return response.send({ success: false, message: 'Falha na autenticação' })
        }
    }
}

module.exports = StatController

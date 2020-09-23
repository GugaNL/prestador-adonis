'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Category = use('App/Models/Category')
const User = use('App/Models/User')
const Transformer = use('App/Transformers/Admin/CategoryTransformer')

/**
 * Resourceful controller for interacting with categories
 */
class CategoryController {
  /**
   * Show a list of all categories.
   * GET categories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   * @param {Object} ctx.pagination
   */
  async index({ request, response, pagination, transform }) {
    const { id, token, name } = request.all()
    let user = await User.findOrFail(id)

    if (user.token == token) {
      try {
        const query = Category.query() //Take all categories (don't need await because is not execute the query, just create a instance and send value into a var)
        if (name) {
          query.where('name', 'LIKE', `%${name}%`)
        }

        //const page = request.input('page') //Middleware pagination o substituiu
        //const limit = request.input('limit') //Middleware pagination o substituiu
        var categories = await query.paginate(pagination.page, pagination.limit)
        categories = await transform.paginate(categories, Transformer)
        return response.send({ success: true, data: categories })
      } catch (error) {
        return response.send({ success: false, message: 'Falha ao tentar listar categorias' })
      }
    } else {
      return response.send({ success: false, message: 'Falha na autenticação' })
    }
  }

  /**
   * Create/save a new category.
   * POST categories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
  }

  /**
   * Display a single category.
   * GET categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, transform }) {
    const { id, token, category_id } = request.all()
    let user = await User.findOrFail(id)

    if (user.token == token) {
      try {
        var category = await Category.findOrFail(category_id) //findOrFail means that if don't find the data then stop the operation and return 404
        category = await transform.item(category, Transformer) //item because is just a one item, not a array in paginate
        return response.send({ success: true, data: category })
      } catch (error) {
        return response.send({ success: false, message: 'Falha ao tentar buscar categoria' })
      }
    } else {
      return response.send({ success: false, message: 'Falha na autenticação' })
    }
  }

  /**
   * Update category details.
   * PUT or PATCH categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a category with id.
   * DELETE categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = CategoryController

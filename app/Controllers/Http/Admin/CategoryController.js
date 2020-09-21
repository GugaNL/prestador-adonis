'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Category = use('App/Models/Category')
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
  async index({ request, response, view, pagination, transform }) {
    const name = request.input('name')
    const query = Category.query() //Take all categories (don't need await because is not execute the query, just create a instance and send value into a var)
    if (name) {
      query.where('name', 'LIKE', `%${name}%`)
    }

    //const page = request.input('page') //Middleware pagination o substituiu
    //const limit = request.input('limit') //Middleware pagination o substituiu
    var categories = await query.paginate(pagination.page, pagination.limit)
    categories = await transform.paginate(categories, Transformer)
    return response.send({ success: true, data: categories })
  }


  /**
   * Create/save a new category.
   * POST categories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, transform }) {
    try {
      const { name, description, image_id } = request.all() //Using destruction take the parameters sended 
      var category = await Category.create({ name, description, image_id })
      category = await transform.item(category, Transformer) //item because is just a one item, not a array in paginate
      return response.status(201).send({ success: true, data: category })
    } catch (error) {
      return response.status(400).send({ success: false, message: 'Erro ao tentar cadastrar categoria' })
    }
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
  async show({ params, request, response, view, transform }) {
    try {
      const id = request.input('id')
      var category = await Category.findOrFail(id) //findOrFail means that if don't find the data then stop the operation and return 404
      category = await transform.item(category, Transformer) //item because is just a one item, not a array in paginate
      return response.send({ success: true, data: category })
    } catch (error) {
      return response.send({ success: false, message: 'Falha ao tentar buscar categoria' })
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
  async update({ params, request, response, transform }) {
    try {
      const { id, name, description, image_id } = request.all()
      var category = await Category.findOrFail(id)
      category.merge({ name, description, image_id })
      await category.save()
      category = await transform.item(category, Transformer) //item because is just a one item, not a array in paginate
      return response.send({ success: true, data: category })
    } catch (error) {
      return response.send({ success: false, message: 'Falha ao tentar atualizar categoria' })
    }
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
    try {
      const id = request.input('id')
      const category = await Category.findOrFail(id)
      await category.delete()
      return response.send({ success: true })
    } catch (error) {
      return response.status(500).send({ success: false, message: 'Falha ao tentar deletar categoria' })
    }
  }
}

module.exports = CategoryController

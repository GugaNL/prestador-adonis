'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Pagination {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle (ctx, next) { //Cancel destruction and the the entire object context
    if (ctx.request.method() === 'GET') { //Check if the requisition is GET
      const page = ctx.request.input('page') ? parseInt(ctx.request.input('page')) : 1
      const limit = ctx.request.input('limit') ? parseInt(ctx.request.input('limit')) : 15

      //Assigns values ​​to the property pagination of the object ctx
      ctx.pagination = {
        page,
        limit
      }
      
      const perPage = parseInt(ctx.request.input('perpage'))

      if (perPage) { //Just a guarantee that this middleware works with limit or perpage params
        ctx.pagination.limit = perPage
      }

    }
    await next() //Default method that inform to adonis to execute the next middleware or process of the queue
  }
}

module.exports = Pagination

'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')
const Logger = use('Logger')

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle (error, { request, response }) {
    if (error.name === 'ValidationException') {
      response.status(error.status).send({
        error: error.messages
      })
      return
    }
    response.status(error.status).send({ error: error.message})
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report (error, { request }) {
    if (error.status >= 500) {
      Logger.error(error.message, {
        stack: error.stack,
        message: error.message,
        status: error.status, // Quando o erro é no mysql então as vezes ele retorna um numero de status bem fora do padrão, daí melhor nomear aqui dessa forma
        name: error.name
      })
    }
  }
}

module.exports = ExceptionHandler

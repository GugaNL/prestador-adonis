'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Image = use('App/Models/Image')
const { manage_single_upload, manage_multiple_upload }
const Helpers = use('Helpers')
const fs = use('fs')

/**
 * Resourceful controller for interacting with images
 */
class ImageController {
  /**
   * Show a list of all images.
   * GET images
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, pagination }) {
    try {
      const images = await Image.query().orderBy('id', 'DESC').paginate(pagination.page, pagination.limit)
      return response.send({ success: true, data: images })
    } catch (error) {
      return response.send({ success: false, message: 'Falha ao tentar listar imagens' })
    }
  }

  /**
   * Create/save a new image.
   * POST images
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      //Capture a single or multiple image of the request
      const fileJar = request.file('images', {
        types: ['image'],
        size: '2mb'
      })

      let images = []


      if (!fileJar.files) { //If a single file

        const file = await manage_single_upload(fileJar)
        if (file.moved()) {
          const image = await Image.create({
            path: file.fileName,
            size: file.size,
            original_name: file.clientName,
            extension: file.subtype
          })

          images.push(image) //Add the saved image in the array that will return response
          return response.status(201).send({ successes: images, errors: {} })
        } else {
          return response.status(400).send({ success: false, message: 'Falha ao processar a imagem' })
        }

      } else { //If multiple files

        let files = await manage_multiple_upload(fileJar)
        await Promise.all(
          files.successes.map(async file => {
            const image = await Image.create({
              path: file.fileName,
              size: file.size,
              original_name: file.clientName,
              extension: file.subtype
            })
            images.push(image)
          })
        )
        return response.status(201).send({ successes: images, errors: files.errors })

      }

    } catch (error) {
      return response.status(400).send({ success: false, message: 'Falha ao processar a solicitação' })
    }
  }

  /**
   * Display a single image.
   * GET images/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    try {
      const id = request.input('id')
      const image = await Image.findOrFail(id)
      return response.send({ success: true, data: image })
    } catch (error) {
      return response.send({ success: false, message: 'Falha ao tentar exibir a imagem' })
    }
  }

  /**
   * Update image details.
   * PUT or PATCH images/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    try {
      const { id, original_name } = request.all()
      const image = await Image.findOrFail(id)
      image.merge({ original_name })
      await image.save()
      return response.send({ success: true, data: image })
    } catch (error) {
      return response.send({ success: false, message: 'Falha ao atualizar imagem' })
    }
  }

  /**
   * Delete a image with id.
   * DELETE images/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    try {
      const id = request.input('id')
      const image = await Image.findOrFail(id)
      let filePath = Helpers.publicPath(`uploads/${image.path}`) //Take the file
      await fs.unlink(filePath, err => {
        if (!err) {
          image.delete()
        }
      })
      return response.status(204).send({ success: true })
    } catch (error) {
      return response.send({ success: false, message: 'Falha ao tentar deletar a imagem' })
    }
  }
}

module.exports = ImageController

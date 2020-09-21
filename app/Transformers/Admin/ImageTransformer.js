'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')

/**
 * ImageTransformer class
 *
 * @class ImageTransformer
 * @constructor
 */
class ImageTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the data.
   */
  transform(image) {
    image = image.toJSON()
    return {
      // add your transformation object here
      id: image.id,
      url: image.url, //url dont exist in Image model, but exist the computed property getUrl
      size: image.size,
      original_name: image.original_name,
      extension: image.extension
    }
  }
}

module.exports = ImageTransformer

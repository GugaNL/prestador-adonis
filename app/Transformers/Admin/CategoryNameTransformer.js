'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')

/**
 * CategoryNameTransformer class
 *
 * @class CategoryNameTransformer
 * @constructor
 */
class CategoryNameTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the data.
   */
  transform(model) {
    return {
      // add your transformation object here
      id: model.id,
      name: model.name
    }
  }
}

module.exports = CategoryNameTransformer

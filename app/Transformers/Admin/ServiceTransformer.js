'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')

/**
 * ServiceTransformer class
 *
 * @class ServiceTransformer
 * @constructor
 */
class ServiceTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the data.
   */
  transform (model) {
    return {
     name: model.name,
     description: model.description,
     value: model.value,
     initial_datetime: model.initial_datetime,
     final_datetime: model.final_datetime,
     status: model.status,
     category_id: model.category_id,
     user_id: model.user_id,
     provider_id: model.provider_id
    }
  }
}

module.exports = ServiceTransformer

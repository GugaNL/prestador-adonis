'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')
const moment = require("moment")
const UserTransformer = use('App/Transformers/Admin/UserTransformer')
const ProviderTransformer = use('App/Transformers/Admin/ProviderTransformer')
const CategoryTransformer = use('App/Transformers/Admin/CategoryTransformer')

/**
 * ServiceTransformer class
 *
 * @class ServiceTransformer
 * @constructor
 */
class ServiceTransformer extends BumblebeeTransformer {
  static get defaultInclude () {
    return [
      'user',
      'category',
      'provider'
    ]
  }

  /**
   * This method is used to transform the data.
   */
  transform (model) {
    return {
     id: model.id,
     name: model.name,
     description: model.description,
     value: model.value,
     initial_datetime: moment(model.initial_datetime).format("DD/MM/YYYY"),
     final_datetime: moment(model.final_datetime).format("DD/MM/YYYY"),
     status: model.status,
     category_id: model.category_id,
     user_id: model.user_id,
     provider_id: model.provider_id
    }
  }

  includeUser(model) {
    return this.item(model.getRelated('user'), UserTransformer)
  }

  includeProvider(model) {
    return this.item(model.getRelated('provider'), ProviderTransformer)
  }

  includeCategory(model) {
    return this.item(model.getRelated('category'), CategoryTransformer)
  }

}

module.exports = ServiceTransformer

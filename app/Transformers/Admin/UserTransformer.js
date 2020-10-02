'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')
const ImageTransformer = use('App/Transformers/Admin/ImageTransformer')
const moment = require("moment")
/**
 * UserTransformer class
 *
 * @class UserTransformer
 * @constructor
 */
class UserTransformer extends BumblebeeTransformer {

  static get defaultInclude() {
    return ['image']
  }
  /**
   * This method is used to transform the data.
   */
  transform (model) {
    return {
     // add your transformation object here
     id: model.id,
     first_name: model.first_name,
     last_name: model.last_name,
     email: model.email,
     birth_date: moment(model.birth_date).format("DD/MM/YYYY"),
     gender: model.gender,
     document: model.document,
     phone: model.phone,
     zip_code: model.zip_code,
     address_street: model.address_street,
     address_number: model.address_number,
     address_neighborhood: model.address_neighborhood,
     address_complement: model.address_complement,
     address_reference: model.address_reference,
     address_city: model.address_city,
     address_state: model.address_state,
     status: model.status
    }
  }

  includeImage(model) {
    return this.item(model.getRelated('image'), ImageTransformer)
  }
}

module.exports = UserTransformer

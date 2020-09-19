'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class TokenProvider extends Model {
    provider() {
        return this.belongsTo('App/Model/Provider')
    }
}

module.exports = TokenProvider

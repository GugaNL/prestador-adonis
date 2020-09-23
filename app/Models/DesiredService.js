'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class DesiredService extends Model {

    /**
     * Relationship between Category and services
     */
    service() {
        return this.belongsToMany('App/Models/Service')
    }
    /**
    * Relationship between Service and user
    */
    user() {
        return this.belongsTo('App/Models/User', 'user_id', 'id')
    }


    /**
     * Relationship between Service and provider
     */
    provider() {
        return this.belongsTo('App/Models/Provider', 'provider_id', 'id')
    }
    
}

module.exports = DesiredService

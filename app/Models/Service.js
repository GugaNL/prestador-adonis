'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Service extends Model {

    /**
     * Format date to the mysql pattern
     */
    static get dates() {
        return ['initial_datetime', 'final_datetime']
    }


    /**
     * Relationship between Service and featured Image
     */
    image() {
        return this.belongsTo('App/Models/Image')
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


    /**
     * Relationship between Service and Category
     */
    category() {
        return this.belongsTo('App/Models/Category', 'category_id', 'id')
    }
    
}

module.exports = Service

'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Category extends Model {

    /**
     * Relationship between Category and featured Image
     */
    image() {
        return this.belongsTo('App/Models/Image')
    }


    /**
     * Relationship between Category and services
     */
    service() {
        return this.belongsToMany('App/Models/Service')
    }
    
}

module.exports = Category

'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Provider extends Model {

    /**
     * A relationship on tokens is required for auth to work
     */
    tokens() {
        return this.hasMany('App/Models/Token')
    }

    /**
   * Format the date to the mysql pattern
   */
    static get dates() {
        return ['birth_date']
    }


    /**
     * Return all info of image related
     */
    image() {
        return this.belongsTo('App/Models/Image')
    }


    /**
     * Return the categories of him
     */
    category() {
        return this.belongsToMany('App/Models/Category')
    }


    /**
     * Return the services of him
     */
    /*service() {
        return this.belongsToMany('App/Models/Service')
    }*/


    /**
     * Oculta os campos definidos no retorno das queries do DB
     */
    static get hidden() {
        return ['password']
    }
    
}

module.exports = Provider

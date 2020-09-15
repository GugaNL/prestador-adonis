'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class Provider extends Model {
    static boot() {
        super.boot()

        /**
         * A hook to hash the provider password before saving
         * it to the database.
         */
        this.addHook('beforeSave', async (providerInstance) => {
            if (providerInstance.dirty.password) {
                providerInstance.password = await Hash.make(providerInstance.password)
            }
        })
    }

    /**
     * A relationship on tokens is required for auth to work
     */
    tokens() {
        return this.hasMany('App/Models/TokenProvider')
    }

    /**
   * Format the date to the mysql pattern
   */
    static get dates() {
        return ['birth_date']
    }

    static get traits() {
        return [
            '@provider:Adonis/Acl/HasRole',
            '@provider:Adonis/Acl/HasPermission'
        ]
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

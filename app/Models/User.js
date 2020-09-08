'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class User extends Model {
  static boot() {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }


  /**
   * Format the date to the mysql pattern
   */
  static get dates() {
    return ['birth_date']
  }


  /**
   * Oculta os campos definidos no retorno das queries do DB
   */
  static get hidden() {
    return ['password']
  }


  static get traits() {
    return [
      '@provider:Adonis/Acl/HasRole',
      '@provider:Adonis/Acl/HasPermission'
    ]
  }


  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    return this.hasMany('App/Models/Token')
  }

  //Return all info of image related
  image() {
    return this.belongsTo('App/Models/Image')
  }

  //Return the services of him
  /*service() {
    return this.belongsToMany('App/Models/Service')
  }*/
  
}

module.exports = User

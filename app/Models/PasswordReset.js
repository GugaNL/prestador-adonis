'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const { str_random } = use('App/Helpers')

class PasswordReset extends Model {
    static boot() {
        super.boot()

        this.addHook('beforeCreate', async model => {
            model.token = await str_random(25) //Generate a randomic string for set the token model
            const expires_at = new Date()
            expires_at.setMinutes(expires_at.getMinutes() + 30)
            model.expires_at = expires_at // Set the model expires_at with 30min of expires validity
        })
    }

    
    /**
     * Format the dates to the mysql format
     */
    static get dates() {
        return ['created_at', 'updated_at', 'expires_at']
    }
    
}

module.exports = PasswordReset

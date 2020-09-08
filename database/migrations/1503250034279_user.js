'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('first_name', 80)
      table.string('last_name', 80)
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.date('birth_date')
      table.boolean('gender')
      table.integer('document')
      table.string('phone', 50)
      table.string('zip_code', 100)
      table.string('address_street', 200)
      table.string('address_number', 100)
      table.string('address_neighborhood', 100)
      table.string('address_complement', 200)
      table.string('address_reference', 200)
      table.string('address_city', 100)
      table.string('address_state', 100)
      table.integer('image_id').unsigned()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema

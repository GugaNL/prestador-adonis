'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProviderSchema extends Schema {
  up () {
    this.create('providers', (table) => {
      table.increments()
      table.string('first_name', 80)
      table.string('last_name', 80)
      table.string('picture', 255)
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('token', 255)
      table.date('birth_date')
      table.string('gender')
      table.string('document')
      table.string('phone', 50)
      table.string('zip_code', 100)
      table.string('address_street', 200)
      table.string('address_number', 100)
      table.string('address_neighborhood', 100)
      table.string('address_complement', 200)
      table.string('address_reference', 200)
      table.string('address_city', 100)
      table.string('address_state', 100)
      //table.integer('image_id').unsigned()
      table.enu('status', ['approved', 'pending', 'rejected'])
      table.integer('category_id').unsigned()

      //table.foreign('image_id').references('id').inTable('images').onDelete('cascade')
      table.foreign('category_id').references('id').inTable('categories').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('providers')
  }
}

module.exports = ProviderSchema

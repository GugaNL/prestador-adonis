'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DesiredServiceSchema extends Schema {
  up () {
    this.create('desired_services', (table) => {
      table.increments()
      table.integer('service_id').unsigned()
      table.integer('user_id').unsigned()
      table.integer('provider_id').unsigned()

      table.foreign('service_id').references('id').inTable('services').onDelete('cascade')
      table.foreign('user_id').references('id').inTable('users').onDelete('cascade')
      table.foreign('provider_id').references('id').inTable('providers').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('desired_services')
  }
}

module.exports = DesiredServiceSchema

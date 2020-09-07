'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ServiceProviderFkSchema extends Schema {
  up () {
    this.table('services', (table) => {
      // alter table
      table.foreign('provider_id').references('id').inTable('providers').onDelete('cascade')
    })
  }

  down () {
    this.table('services', (table) => {
      // reverse alternations
      table.dropForeign('provider_id')
    })
  }
}

module.exports = ServiceProviderFkSchema

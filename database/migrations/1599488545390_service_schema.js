'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ServiceSchema extends Schema {
  up () {
    this.create('services', (table) => {
      table.increments()
      table.string('name', 100)
      table.string('description', 255)
      table.decimal('value', 12, 2)
      table.datetime('initial_datetime')
      table.datetime('final_datetime')
      table.enu('status', [ 'confirmed', 'pending', 'cancelled', 'finished'])
      table.integer('category_id').unsigned()
      table.integer('user_id').unsigned()
      table.integer('provider_id').unsigned()

      table.foreign('category_id').references('id').inTable('categories').onDelete('cascade')
      table.foreign('user_id').references('id').inTable('users').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('services')
  }
}

module.exports = ServiceSchema

'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TokenProviderSchema extends Schema {
  up () {
    this.create('token_providers', (table) => {
      table.increments()
      table.integer('provider_id').unsigned().references('id').inTable('providers')
      table.string('token', 255).notNullable().unique().index()
      table.string('type', 80).notNullable()
      table.boolean('is_revoked').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('token_providers')
  }
}

module.exports = TokenProviderSchema
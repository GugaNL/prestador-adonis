'use strict'

const Schema = use('Schema')

class RoleProviderTableSchema extends Schema {
  up () {
    this.create('provider_role', table => {
      table.increments()
      table.integer('role_id').unsigned().index()
      table.foreign('role_id').references('id').on('roles').onDelete('cascade')
      table.integer('provider_id').unsigned().index()
      table.foreign('provider_id').references('id').on('providers').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('provider_role')
  }
}

module.exports = RoleProviderTableSchema

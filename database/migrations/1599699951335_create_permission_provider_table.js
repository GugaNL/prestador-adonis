'use strict'

const Schema = use('Schema')

class PermissionProviderTableSchema extends Schema {
  up () {
    this.create('permission_provider', table => {
      table.increments()
      table.integer('permission_id').unsigned().index()
      table.foreign('permission_id').references('id').on('permissions').onDelete('cascade')
      table.integer('provider_id').unsigned().index()
      table.foreign('provider_id').references('id').on('providers').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('permission_provider')
  }
}

module.exports = PermissionProviderTableSchema

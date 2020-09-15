'use strict'

/*
|--------------------------------------------------------------------------
| ProviderSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Role = use('Role') //ACL Role (migration create_role_table) //Dont need write the complete path because this was registered in the alias acl in start/app.js when installed acl lib
const Provider = use('App/Models/Provider')

class ProviderSeeder {
  async run () {
    const role = await Role.findBy('slug', 'client')

    //Generate array of providers
    const clientsProvider = await Factory.model('App/Models/Provider').createMany(20)

    //Percorre o array clientsProvider criado e associa cada um a sua role 'client' (RoleSeeder)
    await Promise.all(clientsProvider.map(async client => {
      await client.roles().attach([role.id]) //Mesmo passando só 1 tem que ser como array, e role.id porque quero apenas com role client
    }))

    const provider = await Provider.create({
      first_name: 'Gustavo',
      last_name: 'Lucena',
      email: 'gugakaruaru@hotmail.com',
      password: '123456'
    })

    //Percorre o objeto provider criado e associa a sua role admin (RoleSeeder)
    const adminRole = await Role.findBy('slug', 'admin')
    await provider.roles().attach([adminRole.id])

  }
}

module.exports = ProviderSeeder

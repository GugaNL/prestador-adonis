'use strict'

/*
|--------------------------------------------------------------------------
| ClientSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Role = use('Role') //ACL Role (migration create_role_table) //Dont need write the complete path because this was registered in the alias acl in start/app.js when installed acl lib
const User = use('App/Models/User')

class ClientSeeder {
  async run() {
    const role = await Role.findBy('slug', 'client')

    //Generate array clients of users
    const clientsUsers = await Factory.model('App/Models/User').createMany(20)

    //Percorre o array clientsUsers criado e associa cada um a sua role 'client' (RoleSeeder)
    await Promise.all(clientsUsers.map(async client => {
      await client.roles().attach([role.id]) //Mesmo passando só 1 tem que ser como array, e role.id porque quero apenas com role client
    }))


    //Create a user without role yet
    const user = await User.create({
      first_name: 'Gustavo',
      last_name: 'Lucena',
      email: 'gustavonuneslucena@hotmail.com',
      password: 'secret'
    })

    //Percorre o array de user criado e associa a sua role admin (RoleSeeder)
    const adminRole = await Role.findBy('slug', 'admin')
    await user.roles().attach([adminRole.id])

  }
}

module.exports = ClientSeeder

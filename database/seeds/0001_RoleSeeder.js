'use strict'

/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/


const Role = use('Role') // ACL Role (migration create_role_table) //Dont need write the complete path because this was registered in the alias acl in start/app.js when installed acl lib

class RoleSeeder {
  async run () {
    //Create admin role
    await Role.create({
      name: 'Admin',
      slug: 'admin',
      description: 'Administrador do sistema'
    })

    //Create managment role
    await Role.create({
      name: 'Manager',
      slug: 'manager',
      description: 'Gerente do sistema'
    })

    //Create client role
    await Role.create({
      name: 'Client',
      slug: 'client',
      description: 'Cliente do sistema'
    })
  }
}

module.exports = RoleSeeder

'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
    Route.get('categories', 'CategoryController.index').apiOnly() // User just can list available categories and show it
    Route.get('categories/:id', 'CategoryController.show').apiOnly() // User just can list available categories and show it

    Route.get('services', 'ServiceController.index').apiOnly()
    Route.get('services/:id', 'ServiceController.show').apiOnly()
    Route.post('services', 'ServiceController.store').apiOnly()
    Route.put('services/:id', 'ServiceController.update').apiOnly()
    //User don't delete the service, just cancel it
}).prefix('v1/user').namespace('User')
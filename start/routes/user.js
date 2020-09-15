'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
    Route.get('categories', 'CategoryController.index') // User just can list available categories and show it
    Route.get('categories/:id', 'CategoryController.show') // User just can list available categories and show it

    Route.get('services', 'ServiceController.index')
    Route.get('services/:id', 'ServiceController.show')
    Route.post('services', 'ServiceController.store')
    Route.put('services/:id', 'ServiceController.update')
    //User don't delete the service, just cancel it
}).prefix('v1/user').namespace('User')
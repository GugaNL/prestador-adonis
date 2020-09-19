'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
    Route.get('list_categories', 'CategoryController.index')
    .as('list_categories') // User just can list available categories and show it

    Route.get('show_category', 'CategoryController.show')
    .as('show_category') // User just can list available categories and show it

    Route.get('list_services', 'ServiceController.index')
    .as('list_services')

    Route.get('show_service', 'ServiceController.show')
    .as('show_service')

    Route.post('save_service', 'ServiceController.store')
    .as('save_service')
    .validator('User/StoreService')

    Route.put('update_service', 'ServiceController.update')
    .as('update_service')
    .validator('User/StoreService')

    //User don't delete the service, just cancel it
}).prefix('v1/user').namespace('User')
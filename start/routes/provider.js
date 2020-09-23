'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
    Route.get('list_services', 'ServiceController.index')
    .as('list_services') // Provider just can list available services and show it

    Route.get('show_service', 'ServiceController.show')
    .as('show_service') // Provider just can list available services and show it

    Route.get('list_categories', 'CategoryController.index')
    .as('list_categories') // Provider just can list available categories and show it

    Route.get('show_category', 'CategoryController.show')
    .as('show_category') // Provider just can list available categories and show it

    Route.post('accept_service', 'ServiceController.acceptService')
    .as('accept_service')

    Route.post('cancel_service', 'ServiceController.cancelService')
    .as('cancel_service')
    
}).prefix('v1/provider').namespace('Provider')
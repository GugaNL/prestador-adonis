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
    
}).prefix('v1/provider').namespace('Provider')
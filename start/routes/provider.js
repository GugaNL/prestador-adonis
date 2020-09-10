'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
    Route.get('services', 'ServiceController.index').apiOnly() // Provider just can list available services and show it
    Route.get('services/:id', 'ServiceController.show').apiOnly() // Provider just can list available services and show it
    Route.get('categories', 'CategoryController.index').apiOnly() // Provider just can list available categories and show it
    Route.get('categories/:id', 'CategoryController.show').apiOnly() // Provider just can list available categories and show it
}).prefix('v1/provider').namespace('Provider')
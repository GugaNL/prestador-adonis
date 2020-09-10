'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
    Route.resource('categories', 'CategoryController').apiOnly() // apiOnly means that dont need create form methods
    Route.resource('images', 'ImageController').apiOnly()
    Route.resource('providers', 'ProviderController').apiOnly()
    Route.resource('services', 'ServiceController').apiOnly()
    Route.resource('users', 'UserController').apiOnly()
}).prefix('v1/admin').namespace('Admin')
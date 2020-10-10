'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
    //Category
    //Route.resource('categories', 'CategoryController').apiOnly() // apiOnly means that dont need create form methods
    Route.get('list_categories', 'CategoryController.index')
    .as('list_categories')

    Route.get('show_category', 'CategoryController.show')
    .as('show_category')

    Route.post('save_category', 'CategoryController.store')
    .as('save_category')
    .validator('Admin/StoreCategory')

    Route.post('update_category', 'CategoryController.update')
    .as('update_category')
    .validator('Admin/StoreCategory')

    Route.post('delete_category', 'CategoryController.destroy')
    .as('delete_category')


    //Service
    //Route.resource('services', 'ServiceController').apiOnly() // apiOnly means that dont need create form methods
    Route.get('list_services', 'ServiceController.index')
    .as('list_services')

    Route.get('show_service', 'ServiceController.show')
    .as('show_service')

    Route.post('save_service', 'ServiceController.store')
    .as('save_service')

    Route.post('update_service', 'ServiceController.update')
    .as('update_service')

    Route.post('delete_service', 'ServiceController.destroy')
    .as('delete_service')

    Route.post('change_status_service', 'ServiceController.changeStatusService')
    .as('change_status_service')


    //Image
    Route.resource('images', 'ImageController').apiOnly()

    //Provider
    //Route.resource('providers', 'ProviderController').apiOnly() // apiOnly means that dont need create form methods
    Route.get('list_providers', 'ProviderController.index')
    .as('list_providers')

    Route.get('show_provider', 'ProviderController.show')
    .as('show_provider')

    Route.post('save_provider', 'ProviderController.store')
    .as('save_provider')

    Route.post('update_provider', 'ProviderController.update')
    .as('update_provider')

    Route.post('delete_provider', 'ProviderController.destroy')
    .as('delete_provider')


    //User
    //Route.resource('users', 'UserController').apiOnly() // apiOnly means that dont need create form methods
    Route.get('list_users', 'UserController.index')
    .as('list_users')

    Route.get('show_user', 'UserController.show')
    .as('show_user')

    Route.post('save_user', 'UserController.store')
    .as('save_user')
    //.validator('Admin/StoreUser')

    Route.post('update_user', 'UserController.update')
    .as('update_user')
    //.validator('Admin/StoreUser')

    Route.post('delete_user', 'UserController.destroy')
    .as('delete_user')

    Route.post('change_status_user', 'UserController.changeStatusUser')
    .as('change_status_user')


    //Stat
    Route.get('list_stats', 'StatController.listStats')
    .as('list_stats')
    
}).prefix('v1/admin').namespace('Admin')
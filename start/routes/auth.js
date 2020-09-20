'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
    //For user
    Route.post('register_user', 'AuthController.registerUser')
    .as('auth.register_user')
    .middleware(['guest'])
    .validator('Auth/RegisterUser')  //guest means that dont be logged to execute

    Route.post('login_user', 'AuthController.loginUser')
        .as('auth.login_user')
        .middleware(['guest'])
        .validator('Auth/Login')

    Route.post('refresh_user', 'AuthController.refreshUser')
        .as('auth.refresh_user')
        .middleware(['guest'])

    Route.post('logout_user', 'AuthController.logoutUser')
        .as('auth.logout_user')
        .middleware(['auth']) //auth means that need be logged to execute

    //For provider
    Route.post('register_provider', 'AuthController.registerProvider')
        .as('auth.register_provider')
        .middleware(['guest']) //guest means that dont be logged to execute
        .validator('Auth/RegisterProvider') 

    Route.post('login_provider', 'AuthController.loginProvider')
        .as('auth.login_provider')
        .middleware(['guest'])
        .validator('Auth/Login')

    Route.post('refresh_provider', 'AuthController.refreshProvider')
        .as('auth.refresh_provider')
        .middleware(['guest'])

    Route.post('logout_provider', 'AuthController.logoutProvider')
        .as('auth.logout_provider')
        .middleware(['auth']) //auth means that need be logged to execute


    //Restore password routes
    Route.post('reset-password', 'AuthController.forgotPassword')
        .as('auth.forgotPassword')
        .middleware(['guest'])

    Route.get('reset-password', 'AuthController.remember')
        .as('auth.remember')
        .middleware(['guest'])

    Route.put('reset-password', 'AuthController.resetPassword')
        .as('auth.resetPassword')
        .middleware(['guest']) //put because is a update, but can be post instead also

}).prefix('v1/auth').namespace('Auth')
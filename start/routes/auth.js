'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
    //For user
    Route.post('register_user', 'AuthController.registerUser')
    .as('auth.register_user')
    .validator('Auth/RegisterUser')  //guest means that dont be logged to execute

    Route.post('login_user', 'AuthController.loginUser')
        .as('auth.login_user')
        .validator('Auth/Login')

    Route.post('refresh_user', 'AuthController.refreshUser')
        .as('auth.refresh_user')

    Route.post('logout_user', 'AuthController.logoutUser')
        .as('auth.logout_user')

    //For provider
    Route.post('register_provider', 'AuthController.registerProvider')
        .as('auth.register_provider')
        .validator('Auth/RegisterProvider') 

    Route.post('login_provider', 'AuthController.loginProvider')
        .as('auth.login_provider')
        .validator('Auth/Login')

    Route.post('refresh_provider', 'AuthController.refreshProvider')
        .as('auth.refresh_provider')

    Route.post('logout_provider', 'AuthController.logoutProvider')
        .as('auth.logout_provider')


    //Restore password routes
    Route.post('reset-password', 'AuthController.forgotPassword')
        .as('auth.forgotPassword')

    Route.get('reset-password', 'AuthController.remember')
        .as('auth.remember')

    Route.put('reset-password', 'AuthController.resetPassword')
        .as('auth.resetPassword')

}).prefix('v1/auth').namespace('Auth')
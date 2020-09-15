'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
    Route.post('register_user', 'AuthController.registerUser').as('auth.register_user') // For users
    Route.post('register_provider', 'AuthController.registerProvider').as('auth.register_provider') // For providers
    Route.post('login_user', 'AuthController.loginUser').as('auth.login_user') //For users
    Route.post('login_provider', 'AuthController.loginProvider').as('auth.login_provider') //For providers
    Route.post('refresh_user', 'AuthController.refreshUser').as('auth.refresh_user') //For users
    Route.post('refresh_provider', 'AuthController.refreshProvider').as('auth.refresh_provider') //For providers
    Route.post('logout_user', 'AuthController.logoutUser').as('auth.logout_user') // For users
    Route.post('logout_provider', 'AuthController.logoutProvider').as('auth.logout_provider') // For providers

    //Restore password routes
    Route.post('reset-password', 'AuthController.forgotPassword').as('auth.forgotPassword')
    Route.get('reset-password', 'AuthController.remember').as('auth.remember')
    Route.put('reset-password', 'AuthController.resetPassword').as('auth.resetPassword') //put because is a update, but can be post instead also
}).prefix('v1/auth').namespace('Auth')
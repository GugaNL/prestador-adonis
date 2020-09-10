'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
    Route.post('register', 'AuthController.register').as('auth.register')
    Route.post('login', 'AuthController.login').as('auth.login')
    Route.post('refresh', 'AuthController.refresh').as('auth.refresh')
    Route.post('logout', 'AuthController.logout').as('auth.logout')

    //Restore password routes
    Route.post('reset-password', 'AuthController.forgotPassword').as('auth.forgotPassword')
    Route.get('reset-password', 'AuthController.remember').as('auth.remember')
    Route.put('reset-password', 'AuthController.resetPassword').as('auth.resetPassword') //put because is a update, but can be post instead also
}).prefix('v1/auth').namespace('Auth')
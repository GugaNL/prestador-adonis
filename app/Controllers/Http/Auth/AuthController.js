'use strict'

const Database = use('Database')
const User = use('App/Models/User')
const Token = use('App/Models/Token')
const TokenProvider = use('App/Models/TokenProvider')
const Encryption = use('Encryption')
const Provider = use('App/Models/Provider')
const Role = use('Role')

class AuthController {

    /**
     * Register a user
     */
    async registerUser({ request, response }) {
        const trx = await Database.beginTransaction()

        try {
            const {
                first_name,
                last_name,
                email,
                password,
                birth_date,
                gender,
                document,
                phone,
                zip_code,
                address_street,
                address_number,
                address_neighborhood,
                address_complement,
                address_reference,
                address_city,
                address_state,
                //image_id
            } = request.all()

            const user = await User.create({
                first_name,
                last_name,
                email,
                password,
                birth_date,
                gender,
                document,
                phone,
                zip_code,
                address_street,
                address_number,
                address_neighborhood,
                address_complement,
                address_reference,
                address_city,
                address_state,
                //image_id
            }, trx)

            const userRole = await Role.findBy('slug', 'client') //Take the role for set in the user
            await user.roles().attach([userRole.id], null, trx) //Set role in the user
            await trx.commit() //Commit the transation
            return response.status(201).send({ data: user })
        } catch (error) {
            await trx.rollback()
            return response.status(400).send({ message: 'Erro ao tentar cadastrar usuário' })
        }
    }


    /**
     * Register a provider
     */
    async registerProvider({ request, response }) {
        const trx = await Database.beginTransaction()

        try {
            const {
                first_name,
                last_name,
                email,
                password,
                birth_date,
                gender,
                document,
                phone,
                zip_code,
                address_street,
                address_number,
                address_neighborhood,
                address_complement,
                address_reference,
                address_city,
                address_state,
                //image_id
            } = request.all()

            const provider = await Provider.create({
                first_name,
                last_name,
                email,
                password,
                birth_date,
                gender,
                document,
                phone,
                zip_code,
                address_street,
                address_number,
                address_neighborhood,
                address_complement,
                address_reference,
                address_city,
                address_state,
                //image_id
            }, trx)

            const providerRole = await Role.findBy('slug', 'client') //Take the role for set in the provider
            await provider.roles().attach([providerRole.id], null, trx) //Set role in the provider
            await trx.commit() //Commit the transation
            return response.status(201).send({ data: provider })
        } catch (error) {
            await trx.rollback()
            return response.status(400).send({ message: 'Erro ao tentar cadastrar prestador' })
        }
    }


    /**
     * Login for user
     */
    async loginUser({ request, response, auth }) {
        const { email, password } = request.all()

        try {
            let jsonToken = await auth.authenticator('user').attempt(email, password)
            let user = await User.findBy('email', email)
            user.merge({ token: jsonToken.token })
            user.save()
            return response.send({ success: true, data: user })
        } catch (error) {
            return response.send({ success: false, message: 'Email não encontrado'})
        }

    }


    /**
     * Login for provider
     */
    async loginProvider({ request, response, auth }) {
        const { email, password } = request.all()

        try {
            let jsonToken = await auth.authenticator('provider').attempt(email, password)
            let provider = await Provider.findBy('email', email)
            provider.merge({ token: jsonToken.token })
            provider.save()
            return response.send({ success: true, data: provider })
        } catch (error) {
            console.log(error)
            return response.send({ success: false, message: 'Email não encontrado'})
        }

    }


    /**
     * Refresh user token
     */
    async refreshUser({ request, response, auth }) {
        let refresh_token = request.input('refresh_token')

        if (!refresh_token) { //If don't exists token in the body then take in the header 
            refresh_token = request.header('refresh_token')
        }

        const user = await auth.authenticator('user').newRefreshToken().generateForRefreshToken(refresh_token) //Generate a new token for variable refresh_token
        return response.send({ data: user })
    }


    /**
     * Refresh provider token
     */
    async refreshProvider({ request, response, auth }) {
        let refresh_token = request.input('refresh_token')

        if (!refresh_token) { //If don't exists token in the body then take in the header 
            refresh_token = request.header('refresh_token')
        }

        const provider = await auth.authenticator('provider').newRefreshToken().generateForRefreshToken(refresh_token) //Generate a new token for variable refresh_token
        return response.send({ data: provider })
    }


    /**
     * Logout user
     */
    async logoutUser({ request, response, auth }) {
        let refresh_token = request.input('refresh_token')

        if (!refresh_token) { //If don't exists token in the body then take in the header 
            refresh_token = request.header('refresh_token')
        }

        //await auth.authenticator('provider').revokeTokens(['refresh_token'], true) //Dont working (need delete the token registry in the database)
        const decryptedToken = Encryption.decrypt(refresh_token)
        await Token.query().where('token', decryptedToken).delete()
        return response.status(204).send({ })

    }


    /**
     * Logout provider
     */
    async logoutProvider({ request, response, auth }) {
        let refresh_token = request.input('refresh_token')

        if (!refresh_token) { //If don't exists token in the body then take in the header 
            refresh_token = request.header('refresh_token')
        }

        //await auth.authenticator('provider').revokeTokens(['refresh_token'], true) //Dont working (need delete the token registry in the database)
        const decryptedToken = Encryption.decrypt(refresh_token)
        await TokenProvider.query().where('token', decryptedToken).delete()
        return response.status(204).send({ })
    }


    async forgotPassword({ request, response }) {

    }


    /**
     * Send a email to user/provider about the password change
     */
    async remember({ request, response }) {

    }


    async resetPassword({ request, response }) {

    }

}

module.exports = AuthController

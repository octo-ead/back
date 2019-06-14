'use strict'

const User = use('App/Models/User')

class AuthController {
    async register({ request, response }){
        const data = request.all()

        const resultQuery = await User.where({ email: data.email }).fetch() 
        
        if( resultQuery.size() == 0){
            const new_user = await User.create(data)
            return response.status(201).json(new_user)
        }
        return response.status(400).json()
    }

    async authenticate({ request, auth }){
        const {email, password} = request.all()

        const token = await auth.attempt(email, password)

        return token
    }
}

module.exports = AuthController

'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')


/**
 * Blueprint fakers data structure of User
 */
Factory.blueprint('App/Models/User', (faker) => {
    //default methods of chance api (https://chancejs.com)
    return {
        first_name: faker.first(),
        last_name: faker.last(),
        email: faker.email({ domain: 'gmail.com' }),
        password: 'secret', //set this string for all passwords registers when generate
        birth_date: faker.birthday(),
        gender: faker.gender(),
        document: faker.cpf(),
        phone: faker.phone(),
        zip_code: faker.zip({ plusfour: true }),
        address_street: faker.street(),
        address_number: faker.integer({ min: 0, max: 100 }),
        address_neighborhood: faker.province({ full: true }),
        address_complement: faker.word({ length: 10 }),
        address_reference: faker.word({ length: 10 }),
        address_city: faker.city(),
        address_state: faker.state({ full: true, country: 'us' })
    }
})


/**
 * Blueprint fakers data structure of Provider
 */
Factory.blueprint('App/Models/Provider', (faker) => {
    //default methods of chance api (https://chancejs.com)
    return {
        first_name: faker.first(),
        last_name: faker.last(),
        email: faker.email({ domain: 'hotmail.com' }),
        password: 'secret', //set this string for all passwords registers when generate
        birth_date: faker.birthday(),
        gender: faker.gender(),
        document: faker.cpf(),
        phone: faker.phone(),
        zip_code: faker.zip({ plusfour: true }),
        address_street: faker.street(),
        address_number: faker.integer({ min: 0, max: 100 }),
        address_neighborhood: faker.province({ full: true }),
        address_complement: faker.word({ length: 10 }),
        address_reference: faker.word({ length: 10 }),
        address_city: faker.city(),
        address_state: faker.state({ full: true, country: 'us' })
    }
})


/**
 * Blueprint fakers data structure of categories
 */
Factory.blueprint('App/Models/Category', faker => {
    //default methods of chance api (https://chancejs.com)
    return {
        name: faker.animal(),
        description: faker.sentence()
    }
})

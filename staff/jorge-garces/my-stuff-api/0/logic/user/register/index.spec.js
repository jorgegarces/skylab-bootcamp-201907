const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User } = require('../../../models')

describe('logic - register user', () => {

    before(() => mongoose.connect('mongodb://172.17.0.2/my-stuff-api-test', { useNewUrlParser: true }))

    let name, surname, email, password

    beforeEach(() => {

        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `password-${Math.random()}`
   })

    it('should succeed on correct data', () =>
        logic.user.register(name, surname, email, password)
            .then(result => {
                expect(result).not.to.exist
                return User.findOne({ email, password })
            })
            .then(user => {
                expect(user).to.exist
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)
                expect(user.password).to.equal(password)
            })
    )

    it('should fail if the user already exists', () =>
       User.create({ name, surname, email, password })
           .then (() => logic.user.register(name, surname, email, password)
               .catch( error =>{
                   expect(error).to.exist
                   expect(error.message).to.equal(`User already exists.`)
               })
           )
    )

    /* Name */
    it('should fail on empty name', () => 
        expect(() => 
               logic.user.register('', surname, email, password)
    ).to.throw('name is empty or blank')
    )

     it('should fail on undefined name', () => 
        expect(() => 
               logic.user.register(undefined, surname, email, password)
    ).to.throw(`name with value undefined is not a string`)
    )

     it('should fail on wrong data type for name', () => 
        expect(() => 
               logic.user.register(123, surname, email, password)
    ).to.throw(`name with value 123 is not a string`)
    )

    /* Surname */
    it('should fail on empty surname', () => 
        expect(() => 
               logic.user.register(name, '', email, password)
    ).to.throw('surname is empty or blank')
    )

     it('should fail on undefined surname', () => 
        expect(() => 
               logic.user.register(name, undefined, email, password)
    ).to.throw(`surname with value undefined is not a string`)
    )

     it('should fail on wrong data type for surname', () => 
        expect(() => 
               logic.user.register(name, 123, email, password)
    ).to.throw(`surname with value 123 is not a string`)
    )


    /* Email */
    it('should fail on empty email', () => 
        expect(() => 
               logic.user.register(name, surname, '', password)
    ).to.throw('email is empty or blank')
    )

     it('should fail on undefined surname', () => 
        expect(() => 
               logic.user.register(name, surname, undefined, password)
    ).to.throw(`email with value undefined is not a string`)
    )

     it('should fail on wrong data type for email', () => 
        expect(() => 
               logic.user.register(name, surname, 123, password)
    ).to.throw(`email with value 123 is not a string`)
    )

     it('should fail on wrong email format', () => 
        expect(() => 
               logic.user.register(name, surname, 'a@a', password)
    ).to.throw(`email with value a@a is not a valid e-mail`)
    )

    /* Password */
    it('should fail on empty password', () => 
        expect(() => 
               logic.user.register(name, surname, email, '')
    ).to.throw('password is empty or blank')
    )

     it('should fail on undefined password', () => 
        expect(() => 
               logic.user.register(name, surname, email, undefined)
    ).to.throw(`password with value undefined is not a string`)
    )

     it('should fail on wrong data type for password', () => 
        expect(() => 
               logic.user.register(name, surname, email, 123)
    ).to.throw(`password with value 123 is not a string`)
    )

    after(() => mongoose.disconnect())
})
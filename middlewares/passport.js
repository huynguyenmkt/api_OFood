const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const User = require('../models/User')
const secretString = process.env.JWT_SECRET
passport.use(
    new JwtStrategy(
        {
            jwtFromRequest:
                ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
            secretOrKey: secretString,
        },
        async (payload, done) => {
            try {
                const user = await User.findById(payload.sub)
                if (!user) {
                    const err = new Error('User is not exits')
                    err.status = 404
                    return done(err, null, false)
                    // return done(null, false)
                }
                done(null, user)
            } catch (error) {
                console.log('token wrong')
                const err = new Error('Token is Invalid')
                err.status = 401
                return done(err, null, false)
            }
        }
    )
)

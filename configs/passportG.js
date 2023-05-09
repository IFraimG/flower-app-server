let passport = require("passport")
let JwtStrategy = require("passport-jwt").Strategy
let ExtractJwt = require("passport-jwt").ExtractJwt
let User = require("../models/Getter.js")
let { jwtsecret } = require("./jwt")
// NOT USED
let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = jwtsecret

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser(async (id, done) => {
  try {
    let user = await User.findById(id).exec()
    done(null, user)
  } catch (error) {
    done(error)
  }
})

passport.use(
  new JwtStrategy(opts, async (jwtPayload, done) => {
    try {
      let user = await User.findById(jwtPayload.sub).exec()
      if (user) done(null, user)
      else done(null, false)
    } catch (error) { return done(error, false) }
  })
)

module.exports = passport
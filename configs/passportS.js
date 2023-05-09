let passport = require("passport")
let JwtStrategy = require("passport-jwt").Strategy
let ExtractJwt = require("passport-jwt").ExtractJwt
let Setter = require("../models/Setter.js")
let Getter = require("../models/Getter.js")
let { jwtsecret } = require("./jwt")

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = jwtsecret

// passport.serializeUser((user, done) => done(null, user))
// passport.deserializeUser(async (id, done) => {
//   try {
//     let user = await User.findOne({authID: id})
//     done(null, user)
//   } catch (error) {
//     done(error)
//   }
// })

passport.use(
  new JwtStrategy(opts, async (jwtPayload, done) => {
    try {
      let user = null
      if (jwtPayload.type == "getter") {
        user = await Getter.findOne({_id: jwtPayload.sub})
      } else user = await Setter.findOne({authID: jwtPayload.sub})

      if (user) done(null, user)
      else done(null, false)
    } catch (error) { return done(error, false) }
  })
)

module.exports = passport
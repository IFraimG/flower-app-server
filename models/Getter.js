const mongoose = require("mongoose")

const GetterSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    market: {
        type: String,
        required: false
    }
})

// GetterSchema.methods.encryptPassword = function(password) {
//     return crypto
//       .createHmac("sha1", this.salt)
//       .update(password.toString())
//       .digest("hex")
// }
  
// GetterSchema.methods.checkPassword = function(password) {
//     return this.password === crypto
//       .createHmac("sha1", this.salt)
//       .update(password.toString())
//       .digest("hex")
// }
  
// GetterSchema.virtual("password")
//     .set(function (password) {
//       this._plainPassword = password
//       this.salt = Math.random().toFixed(6) + ''
//       this.password = this.encryptPassword(password)
//     })
//     .get(function() { return this._plainPassword })


module.exports = mongoose.model("Getter", GetterSchema)
const mongoose = require("mongoose")

const SetterSchema = new mongoose.Schema({
    X5_ID: mongoose.Schema.Types.ObjectId,
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
    // successHistory: [mongoose.Schema.Types.ObjectId]
})

// SetterSchema.methods.encryptPassword = function(password) {
//     return crypto
//       .createHmac("sha1", this.salt)
//       .update(password.toString())
//       .digest("hex")
// }
  
// SetterSchema.methods.checkPassword = function(password) {
//     return this.hashedPassword === crypto
//       .createHmac("sha1", this.salt)
//       .update(password.toString())
//       .digest("hex")
// }
  
// SetterSchema.virtual("password")
//     .set(function (password) {
//       this._plainPassword = password
//       this.salt = Math.random().toFixed(6) + ''
//       this.hashedPassword = this.encryptPassword(password)
//     })
//     .get(function() { return this._plainPassword })

module.exports = mongoose.model("Setter", SetterSchema)
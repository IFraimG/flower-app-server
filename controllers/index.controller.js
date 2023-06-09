const Needy = require("../models/Needy")
const Giver = require("../models/Giver")

module.exports.getPinMarket = async (req, res) => {
  if (req.query.typeUser == "giver") {
    try {
      let giver = await Giver.findById(req.query.userID)
      if (giver?.market == null) return res.status(404).send({ message: "Error" })
      else return res.status(200).send({market: giver.market})
    } catch (error) {
      console.log(error.message);
      return res.status(404).send({ message: "Error" })
    }
  } else {
    try {
      let needy = await Needy.findById(req.query.userID)
      if (needy?.market == null) return res.status(404).send({message: "Error"})
      else return res.status(200).send({market: needy.market})
    } catch (error) {
      console.log(error.message);
      return res.status(404).send({ message: "Error" })
    }
  }
}


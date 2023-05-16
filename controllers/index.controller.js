const Getter = require("../models/Getter")
const Setter = require("../models/Setter")

module.exports.getPinMarket = async (req, res) => {
  if (req.query.typeUser == "setter") {
    try {
      let setter = await Setter.findById(req.query.userID)
      if (setter?.market == null) return res.status(404).send({ message: "Error" })
      else return res.status(200).send({market: setter.market})
    } catch (error) {
      console.log(error.message);
      return res.status(404).send({ message: "Error" })
    }
  } else {
    try {
      let getter = await Getter.findById(req.query.userID)
      if (getter?.market == null) return res.status(404).send({message: "Error"})
      else return res.status(200).send({market: getter.market})
    } catch (error) {
      console.log(error.message);
      return res.status(404).send({ message: "Error" })
    }
  }
}


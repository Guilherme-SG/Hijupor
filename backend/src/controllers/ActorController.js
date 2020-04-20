const ActorModel = require("../models/Actor")

class ActorController {
    async store(req, res) {
        let actor = await ActorModel.create(req.body)
        return res.json(actor)
    }

    async findByName(req, res) {
        const { name } = req.query
        const actor = await ActorModel.findOne({ name })
        
        return res.json(actor)
    }

    async findById(req, res) {
        const { id } = req.params
        return res.json({ id })
    }
}

module.exports = new ActorController()
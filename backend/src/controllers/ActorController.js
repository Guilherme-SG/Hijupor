const ActorModel = require("../models/Actor")
const Stats = require("../classes/actor/Stats")
const Actor = require("../classes/actor/Actor")

class ActorController {
    async store(req, res) {
        const data = req.body
        
        const actorInput = new Actor({
            ...data,
            stats: new Stats(data.stats)
        })

        actorInput.update()

        let actor = await ActorModel.create(actorInput)
        actor.id = actor._id
        return res.json(actor)
    }

    async update(req, res) {
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
        const actor = await ActorModel.findOne({ _id: id })
        return res.json(actor)
    }
}

module.exports = new ActorController()
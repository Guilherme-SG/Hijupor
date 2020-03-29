const express = require("express")
const routes = express.Router()

const gameSystem = require("./classes/GameSystem")

routes.get("/skills/:name", async (request, response) => {
    const { name } = request.params
    const skill = gameSystem.getSkillByName(name)
    return response.json({
        skill
    })
})

routes.get("/skills/:id", async (request, response) => {
    const { id } = request.params
    const skill = gameSystem.getSkillById(id)
    return response.json({
        skill
    })
})

routes.get("/actors/:name", async (request, response) => {
    const { name } = request.params

    const actor = gameSystem.getActorByName(name)

    return response.json({
        actor
    })
})

module.exports = routes
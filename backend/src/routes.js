const routes = require("express").Router()

const gameSystem = require("./classes/GameSystem")
const SkillSystem = require("./classes/skill/SkillSystem")

const Actor = require("./classes/Actor")
const Party = require("./classes/Party")
const Skill = require("./classes/skill/Skill")

routes.get("/skill/:name", async (request, response) => {
    const { name } = request.params
    const skill = gameSystem.getSkillByName(name)
    return response.json({
        skill
    })
})

routes.get("/skill/:id", async (request, response) => {
    const { id } = request.params
    const skill = gameSystem.getSkillById(id)
    return response.json({
        skill
    })
})

routes.get("/skill-use", async (request, response) => {
    const { casterId, subjectId, skillId } = request.body
    
    const skillSystem = new SkillSystem() 

    gameSystem.setSelectedActor(subjectId)
    skillSystem.useSkill(casterId, skillId)

    const caster = gameSystem.getCaster()
    const target = gameSystem.getSelectedActor()

    return response.json({
        caster: {
            currentHP: caster.currentHP,
            totalHP: caster.totalHP,
            currentStamina: caster.currentStamina,
            totalStamina: caster.totalStamina,
            isAlive: caster.isAlive()
        },
        target: {
            currentHP: target.currentHP,
            totalHP: target.totalHP,
            currentStamina: target.currentStamina,
            totalStamina: target.totalStamina,
            isAlive: target.isAlive()
        },
    })
})

routes.post("/skill", async (request, response) => {
    const skill = new Skill(request.body)
    gameSystem.registerSkill(skill)

    return response.json({ id: skill.id })
})

routes.get("/actor/:name", async (request, response) => {
    const { name } = request.params

    const actor = gameSystem.getActorByName(name)

    return response.json({
        actor
    })
})

routes.post("/actor", async (request, response) => {
    const { name } = request.body

    const actor = new Actor(name)
    gameSystem.addActor(actor)

    return response.json({ id: actor.id })
})

module.exports = routes
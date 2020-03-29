const ConditionalSystem = require('./ConditionalSystem')
const SkillSystem = require('./skill/SkillSystem')

class GameSystem {
    constructor() {
        this.actors = {}
        this.parties = {}

        this.skillList = {}
/*
        this.conditionalSystem = new ConditionalSystem()
        this.skillSystem = new SkillSystem()
*/
        return this.getInstance()
    }

    getInstance() {
        if(!GameSystem.instance) {
            GameSystem.instance = new GameSystem()
        }

        return GameSystem.instance
    }

    addActor(actor) {
        this.actors[actor.id] = actor
    }

    getActor(id) {
        return this.actors[id]
    }

    addParty(party) {
        this.parties[party.id] = party
    }

    getParty(id) {
        return this.parties[id]
    }

    registerSkill(skill) {
        this.skillList[skill.id] = skill
    }

    removeSkill(id) {
        delete this.skillList[id]
    }

    getSkillByName(name) {
        return Object.values(this.skillList).find(skill => skill.name == name)
    }

    getSkillById(id) {
        return this.skillList[id]
    }

    useSkill(casterId, skillReference) {
        const caster = this.getActor(casterId)
        const skill = typeof skillReference == "string" ? 
            this.getSkillByName(skillReference) : this.getSkillById(skillReference)
        
        this.skillSystem.activeTags(caster, skill)
    }
}

module.exports = GameSystem
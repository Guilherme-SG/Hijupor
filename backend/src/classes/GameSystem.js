/*
const ConditionalSystem = require('./ConditionalSystem')
const SkillSystem = require('./skill/SkillSystem')

const Singleton = require("./Singleton")*/

class GameSystem {
    constructor() {
        //const self = super()

        this.actors = {}
        this.parties = {}

        this.selectedActorId = -1
        this.selectedPartyId = -1

        this.lastCasterId = -1

        this.skillList = {}
/*
        this.conditionalSystem = new ConditionalSystem()
        this.skillSystem = new SkillSystem()*/

        return this.getInstance()
    }

    getInstance() {
        if(!GameSystem.instance) {
            GameSystem.instance = this
        }

        return GameSystem.instance
    }

    addActor(actor) {
        this.actors[actor.id] = actor
    }

    getActor(id) {
        return this.actors[id]
    }

    getCaster() {
        return this.getActor(this.lastCasterId)
    }

    setSelectedActor(id) {
        this.selectedActorId = id
    }

    getSelectedActor() {
        return this.getActor(this.selectedActorId)
    }

    addParty(party) {
        this.parties[party.id] = party
    }

    getParty(id) {
        return this.parties[id]
    }

    setSelectedParty(id) {
        this.selectedPartyId = id
    }

    getSelectedParty() {
        return this.getParty(this.selectedPartyId)
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

    useSkill(casterId, skillReference, skillSystem) {
        const caster = this.getActor(casterId)
        const skill = typeof skillReference == "string" ? 
            this.getSkillByName(skillReference) : this.getSkillById(skillReference)

        this.lastCasterId = casterId
        
        skillSystem.activeTags(caster, skill)
    }
}

const gameSystem = new GameSystem()

module.exports = gameSystem
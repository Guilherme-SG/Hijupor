class GameSystem {
    constructor() {
        this.actors = {}
        this.parties = {}

        this.selectedActorId = -1
        this.selectedPartyId = -1

        this.lastCasterId = -1

        this.skillList = {}

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

    getActorByName(name) {
        return Object.values(this.actors).find( actor => actor.name == name )
    }

    setCaster(id) {
        this.lastCasterId = id
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
}

module.exports = new GameSystem()
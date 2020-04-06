class ActorManager {
    constructor(actorModel) {
        this.actors = {}

        this.selectedActorId = -1
        this.casterId = -1

        this.actorModel = actorModel
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
        this.casterId = id
    }

    getCaster() {
        return this.getActor(this.casterId)
    }

    selectActor(id) {
        this.selectedActorId = id
    }

    getSelectedActor() {
        return this.getActor(this.selectedActorId)
    }
}


module.exports = ActorManager
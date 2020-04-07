const CollectionManager = require("./CollectionManager")

class ActorManager extends CollectionManager {
    constructor(actorModel) {
        super()

        this.selectedActorId = -1
        this.casterId = -1

        this.actorModel = actorModel
    }


    getByName(name) {
        return [...this.collection.values()].find( actor => actor.name == name )
    }

    setCaster(id) {
        this.casterId = id
    }

    getCaster() {
        return this.get(this.casterId)
    }

    select(id) {
        this.selectedActorId = id
    }

    getSelected() {
        return this.get(this.selectedActorId)
    }
}


module.exports = ActorManager
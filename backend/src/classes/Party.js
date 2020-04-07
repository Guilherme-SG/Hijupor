const { createId } = require("../util")
const Serializable = require("./Serializable")


class Party extends Serializable {
    constructor({
        name, 
        id = createId(),
        members = new Map
    }) {
        super()
        
        this.id = id
        this.name = name
        this.members = members
    }

    add(member) {        
        this.members.set(member.id, member) 
        member.setParty(this.id)
    }

    delete(id) {
        this.members.get(id).setParty(-1)
        this.members.delete(id)
    }

    get = actorId => this.members.get(actorId)

    has = actorId => this.members.has(actorId)

    getAll() {
        return [...this.members.values()]
    }

    serialize() {
        return {
            id: this.id,
            members: [...this.members.keys()]
        }
    }
}

module.exports = Party
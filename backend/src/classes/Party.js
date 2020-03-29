const { createId } = require("../util")

class Party {
    constructor(name, id = createId()) {
        this.id = id
        this.name = name
        this.members = {}
    }

    addMember(member) {        
        this.members[member.id] = member
        this.members[member.id].setParty(this.id)
    }

    removeMember(id) {
        this.members[id].setParty(-1)
        delete this.members[id]
    }

    getMemberById = id => this.members[id]

    includes = actorId => this.getMemberById(actorId) != undefined

    getMembers() {
        return Object.values(this.members)
    }
}

module.exports = Party
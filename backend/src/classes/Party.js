const { createId } = require("../util")
const CollectionManager = require("./managers/CollectionManager")


class Party extends CollectionManager {
    constructor({
        name, 
        id = createId(),
        collection
    }) {
        super()
        
        this.id = id
        this.name = name

        if(collection) {
            this.collection = collection
        }
    }

    add(member) {        
        super.add(member) 
        member.setParty(this.id)
    }

    delete(id) {
        const member = super.get(id)
        member.setParty(-1)
        
        super.delete(id)
    }


    serialize() {
        return {
            id: this.id,
            members: [...this.collection.keys()]
        }
    }
}

module.exports = Party
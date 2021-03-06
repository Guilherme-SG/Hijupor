const CollectionManager = require("./CollectionManager")

class PartyManager extends CollectionManager {
    constructor() {
        super()
        this.selectedPartyId = -1
    }

    getByName(name) {
        return [...this.collection.values()].find( party => party.name == name )
    }

    select(id) {
        this.selectedPartyId = id
    }

    getSelected() {
        return this.get(this.selectedPartyId)
    }

    delete(id) {
        this.get(id)
            .deleteAll()

        super.delete(id)
    }
}


module.exports = PartyManager
class PartyManager {
    constructor() {
        this.parties = {}
        this.selectedPartyId = -1
    }

    addParty(party) {
        this.parties[party.id] = party
    }

    getParty(id) {
        return this.parties[id]
    }

    selectParty(id) {
        this.selectedPartyId = id
    }

    getSelectedParty() {
        return this.getParty(this.selectedPartyId)
    }
}


module.exports = PartyManager
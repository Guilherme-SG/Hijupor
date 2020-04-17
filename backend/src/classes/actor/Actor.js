const BaseActor = require("./BaseActor")

class Actor extends BaseActor {
    constructor({
        stats, 
        id,        
        name,
        partyId,
        status,
        skills
    }) {
        super({
            stats, 
            id,        
            name,
            partyId,
            status,
            skills
        })

        
        this.summons = []
    }

    update() {
        super.update()

        this.summons = this.summons.filter( 
            summon => summon.isAlive() )

        this.summons
            .forEach( summon => summon.update())
    }

    addSummon(summon) {
        this.summons.push(summon)
    }

    getSummons() {
        return this.summons
    }

    removeSummon(summon) {
        this.summons = this.summons.filter( ally => ally != summon )
    }
}

module.exports = Actor
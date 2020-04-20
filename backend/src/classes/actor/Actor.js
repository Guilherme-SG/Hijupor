const BaseActor = require("./BaseActor")

class Actor extends BaseActor {
    constructor({
        stats, 
        id,        
        name,
        partyId,
        status,
        skills,
        job,
        race,
        age,
        local,
        personality
    }) {
        super({
            stats, 
            id,        
            name,
            partyId,
            status,
            skills
        })
        this.job = job
        this.race = race
        this.age = age
        this.local = local
        this.personality = personality

        this.overControl = []
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

    getControlOverActor(actor) {
        actor.addStatus("controlled")
        this.overControl.push(actor)
    }
}

module.exports = Actor
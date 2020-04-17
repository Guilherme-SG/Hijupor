const BaseActor = require("./BaseActor")
const Stats = require("./Stats")

class BasedStats {
    constructor(reference, stats, sharedPercentage) {
        this.reference = reference
        this.stats = stats
        this.sharedPercentage = sharedPercentage
    }

    update() {
        Object.keys(this.stats)
            .forEach( 
                stat => this.stats[stat].baseValue = this.reference.get(stat) * this.sharedPercentage
            )
    }
}

class Summon extends BaseActor{
    constructor({
        stats, 
        id,        
        name,
        partyId,
        status,
        skills,
        duration,
        statsPercentage = 1
    }) {
        super({
            stats,
            id,        
            name,
            partyId,
            status,
            skills
        })
        
        this.stats = new Stats({})
        this.basedStats = new BasedStats(
            stats,
            this.stats,
            statsPercentage
        )

        this.basedStats.update()


        this.duration = duration
        this.timeLeft = this.duration
    }

    update() {
        this.timeLeft--

        if(this.timeLeft) {            
            this.basedStats.update()
            super.update()
        } else {
            this.die()
        }
    }
}

module.exports = Summon
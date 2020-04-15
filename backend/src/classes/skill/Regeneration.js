class Regeneration {
    constructor(rawPercentage, duration) {
        this.rawPercentage = rawPercentage
        this.duration = duration
        this.timeLeft = duration
    }

    setTarget(actor) {
        this.target = actor
    }

    update() {
        this.timeLeft--
        this.target.heal(this.rawPercentage * this.target.getTotalHP())

        if(this.timeLeft == 0) {
            this.target.removeRegeneration(this)
        }
    }
}

module.exports = Regeneration
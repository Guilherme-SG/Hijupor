const BaseAttribute = require("./BaseAttribute")

class FinalBonus extends BaseAttribute {
    constructor(value, multiplier, duration, type) {
        super(value, multiplier)

        this.duration = duration
        this.type = type
    }

    setParent(parent) {
        this.parent = parent
    }

    update() {
        this.duration--

        if(this.duration == 0) {
            this.parent.deleteFinalBonus(this)
        }
    }

    delete() {
        if(this.parent) {
            this.parent.deleteFinalBonus(this)
        }
    }
}

module.exports = FinalBonus
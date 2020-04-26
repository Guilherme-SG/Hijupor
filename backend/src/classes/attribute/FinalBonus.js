const BaseAttribute = require("./BaseAttribute")

class FinalBonus extends BaseAttribute {
    constructor(value, multiplier, duration = 0, type) {
        super(value, multiplier)

        this.duration = duration
        this.type = type
    }

    setParent(parent) {
        this.parent = parent
    }

    update() {
        if(this.duration) {
            this.duration--
        }

        if(!this.duration) {
            this.selfDelete(this)
        }
            
    }

    selfDelete() {
        this.notify({
            type: "deleteFinalBonus",
            reference: this
        })
    }
}

module.exports = FinalBonus
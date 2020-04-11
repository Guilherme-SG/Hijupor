const BaseAttribute = require("./actor/BaseAttribute")

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
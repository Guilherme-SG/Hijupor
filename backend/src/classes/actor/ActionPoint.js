const FinalBonus = require("../attribute/FinalBonus")

const DependantAttributeContainer = require("./DependantAttributeContainer")

class ActionPoint extends DependantAttributeContainer {
    constructor(agi) {
        super(1, agi, 1, 50)
    }

    accumulateAP() {
        this.total.addFinalBonus(new FinalBonus(this.current.getFinalValue(), 0, 1))
    }

    update() {
        this.total.update()
        if(this.current.getFinalValue() > 0) {
            this.accumulateAP()
        }

        this.current.update()
        this.setCurrentAsTotalFInalValue()
    }

    getAvailable() {
        this.setCurrentAsTotalFInalValue()
        return super.getAvailable()
    }

    usePoints(points) {
        if(this.current.getFinalValue() >= points) {
            this.current.addFinalBonus(new FinalBonus(-points, 0, 1))
            return true
        }

        return false        
    }

    addExtraPoint(points, duration) {
        this.current.addFinalBonus(new FinalBonus(points, 0, duration))
    }
}

module.exports = ActionPoint
const Attribute = require("./Attribute")
const FinalBonus = require("../FinalBonus")

class ActionPoint {
    constructor(current = 1, total = 1) {
        this.currentPA = new Attribute(current)
        this.totalPA = new Attribute(total)
    }

    calculateTotalPA(agi = 0) {
        this.totalPA.baseValue = 1 + Math.floor(agi / 50)
        this.currentPA.baseValue = this.totalPA.getBaseValue()
    }

    accumulatePa() {
        this.totalPA.addFinalBonus(new FinalBonus(this.currentPA.getFinalValue(), 0, 1))
    }

    update() {
        this.totalPA.update()
        
        if(this.currentPA.getFinalValue() > 0) {
            this.accumulatePa()
        }

        this.currentPA.update()
        this.currentPA.baseValue = this.totalPA.getFinalValue()    
    }

    getAvailablePoints() {
        return this.currentPA.getFinalValue()
    }

    getTotalPoints() {
        return this.totalPA.getFinalValue()
    }

    usePoints(points) {
        if(this.currentPA.getFinalValue() >= points) {
            this.currentPA.addFinalBonus(new FinalBonus(-points, 0, 1))
            return true
        }

        return false        
    }

    addExtraPoint(points, duration) {
        this.currentPA.addFinalBonus(new FinalBonus(points, 0, duration))
    }
}

module.exports = ActionPoint
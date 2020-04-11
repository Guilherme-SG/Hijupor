
const FinalBonus = require("../attribute/FinalBonus")


const CurrentAP = require("../actor/CurrentAP")
const TotalAP = require("../actor/TotalAP")


class ActionPoint {
    constructor(agi) {
        this.totalAP = new TotalAP(1)
        this.totalAP.addAttribute(agi)

        let totalAPValue = this.totalAP.getFinalValue()
        this.currentAP = new CurrentAP(totalAPValue)      
    }

    accumulateAP() {
        this.totalAP.addFinalBonus(new FinalBonus(this.currentAP.getFinalValue(), 0, 1))
    }

    update() {
        this.totalAP.update()
        if(this.currentAP.getFinalValue() > 0) {
            this.accumulateAP()
        }

        this.currentAP.update()
        this.currentAP.baseValue = this.totalAP.getFinalValue()
    }

    getAvailablePoints() {
        this.currentAP.baseValue = this.totalAP.getFinalValue()
        return this.currentAP.getFinalValue()
    }

    getTotalPoints() {
        return this.totalAP.getFinalValue()
    }

    usePoints(points) {
        if(this.currentAP.getFinalValue() >= points) {
            this.currentAP.addFinalBonus(new FinalBonus(-points, 0, 1))
            return true
        }

        return false        
    }

    addExtraPoint(points, duration) {
        this.currentAP.addFinalBonus(new FinalBonus(points, 0, duration))
    }
}

module.exports = ActionPoint
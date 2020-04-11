const DependantAttribute = require("../attribute/DependantAttribute")
const FinalBonus = require("../attribute/FinalBonus")

class TotalAP extends DependantAttribute{
    constructor(startValue) {
        super(startValue)
    }

    calculateValue() {
        this.finalValue = this.baseValue

        let agi = this.otherAttributes[0]
        if(agi) {
            this.finalValue += Math.floor(agi.getFinalValue() / 50)
        }        

        this.applyRawBonuses()
        this.applyFinalBonuses()

        return this.finalValue
    }
}

class ActionPoint {
    constructor(agi) {
        this.totalPA = new TotalAP(1)
        this.totalPA.addAttribute(agi)

        let totalPAValue = this.totalPA.getFinalValue()
        this.currentPA = new DependantAttribute(totalPAValue)
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
const DependantAttribute = require("../attribute/DependantAttribute")

class TotalAP extends DependantAttribute{
    constructor(startValue) {
        super(startValue)
    }

    getBaseValue() {
        let agi = this.otherAttributes[0]

        if(agi) {
            return this.baseValue + Math.floor(agi.getFinalValue() / 50)
        }  

        return this.baseValue 
    }

    calculateValue() {
        this.finalValue = this.getBaseValue()

        this.applyRawBonuses()
        this.applyFinalBonuses()

        return this.finalValue
    }
}

module.exports = TotalAP
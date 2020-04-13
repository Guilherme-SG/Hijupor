const Attribute = require("../attribute/Attribute")

class SingleDependantAttribute extends Attribute {
    constructor(startValue, otherAttribute, addValue, eachPoint) {
        super(startValue)
        this.otherAttribute = otherAttribute
        this.addValue = addValue
        this.eachPoint = eachPoint
    }

    calculateValue() {
        this.finalValue = this.baseValue
        
        this.applyDependancy()
        this.applyRawBonuses()
        this.applyFinalBonuses()

        return this.finalValue
    }
    
    applyDependancy() {
        let attributeFinalValue = this.otherAttribute.getFinalValue()
        this.finalValue += this.addValue * Math.floor(attributeFinalValue / this.eachPoint)
    }
}

module.exports = SingleDependantAttribute
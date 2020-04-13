const SingleDependantAttribute = require("../attribute/SingleDependantAttribute")
const Attribute = require("../attribute/Attribute")

class DependantAttributeContainer  {
    constructor(startValue, attribute, addValue, eachPoint) {
        
        this.total = new SingleDependantAttribute(
            startValue,
            attribute,
            addValue,
            eachPoint
        )

        let totalFinalValue = this.total.getFinalValue()
        this.current = new Attribute(totalFinalValue)
    }

    update() {
        this.total.update()
        this.current.update()
        this.setCurrentAsTotalFInalValue()
    }

    setCurrentAsTotalFInalValue() {
        this.current.baseValue = this.total.getFinalValue()
    }

    getNecessaryToBeFull() {
        return this.getTotal() - this.getAvailable()
    }

    getAvailable() {
        return this.current.getFinalValue()
    }

    getTotal() {
        return this.total.getFinalValue()
    }

    getPercentage() {
        return this.current.getFinalValue() / this.total.getFinalValue()
    }
}

module.exports = DependantAttributeContainer
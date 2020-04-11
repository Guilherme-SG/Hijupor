const BaseAttribute = require("./BaseAttribute")

class Attribute extends BaseAttribute {
    constructor(startValue = 0) {
        super(startValue)

        this.rawBonuses = []
        this.finalBonuses = []

        this.finalValue = 0
    }

    addRawBonus(rawBonus) {
        this.rawBonuses.push(rawBonus)
    }

    deleteRawBonus(rawBonus) {
        let indexOf = this.rawBonuses.indexOf(rawBonus)

        if(indexOf >= 0) {
            this.rawBonuses.splice(rawBonus, 1)
        }
    }

    deleteAllRawBonus() {
        this.rawBonuses = []
    }

    addFinalBonus(finalBonus) {
        finalBonus.setParent(this)
        this.finalBonuses.push(finalBonus)
    }

    deleteFinalBonus(finalBonus) {
        let indexOf = this.finalBonuses.indexOf(finalBonus)

        if(indexOf >= 0) {
            this.finalBonuses.splice(finalBonus, 1)
        }
    }

    deleteAllFinalBonus() {
        this.finalBonuses = []
    }

    calculateValue() {
        this.finalValue = this.baseValue

        this.applyRawBonuses()
        this.applyFinalBonuses()

        return this.finalValue
    }

    applyRawBonuses() {
        let rawBonusValue = 0
        let rawBonusMultiplier = 0

        this.rawBonuses.forEach(rawBonus => {
            rawBonusValue += rawBonus.getBaseValue()
            rawBonusMultiplier += rawBonus.getBaseMultiplier()
        })

        this.finalValue += rawBonusValue
        this.finalValue *= 1 + rawBonusMultiplier
    }
    
    applyFinalBonuses() {
        let finalBonusValue = 0
        let finalBonusMultiplier = 0

        this.finalBonuses.forEach(finalBonus => {
            finalBonusValue += finalBonus.getBaseValue()
            finalBonusMultiplier += finalBonus.getBaseMultiplier()
        })

        this.finalValue += finalBonusValue
        this.finalValue *= 1 + finalBonusMultiplier
    }

    getFinalValue() {
        return Math.round(this.calculateValue())
    }

    update() {
        [...this.finalBonuses].forEach( finalBonus => finalBonus.update() )
    }
}

module.exports = Attribute
const DependantAttributeContainer = require("./DependantAttributeContainer")
const RawBonus = require("../attribute/RawBonus")

class Health extends DependantAttributeContainer {
    constructor(attribute) {
        super(100, attribute, 5, 1)
    }

    takeDamage(damageAmount) {
        let prevHP = this.current.getFinalValue()

        if(damageAmount > prevHP) {
            this.current.addRawBonus(new RawBonus(-prevHP))
        } else {
            this.current.addRawBonus(new RawBonus(-damageAmount))
        }
        
        return damageAmount - prevHP
    }

    heal(healAmount) {
        if(this.isHealMoreThanNecesary(healAmount)) {
            healAmount = this.getNecessaryToBeFull()
        }
        
        this.current.addRawBonus(new RawBonus(healAmount))
    }

    isHealMoreThanNecesary(heal) {
        return heal + this.getAvailable() > this.getTotal()
    }
}

module.exports = Health
const DependantAttributeContainer = require("./DependantAttributeContainer")
const RawBonus = require("../attribute/RawBonus")

class Stamina extends DependantAttributeContainer {
    constructor(attribute) {
        super(100, attribute, 50, 20)
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

    break() {
        this.current.addRawBonus(new RawBonus(-this.getAvailable()))
    }

    isBroken = () => this.getAvailable() <= 0
    isNotBroken = () => !this.isBroken()

    canBeBroken = (damageAmount) => damageAmount >= this.getAvailable()

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

module.exports = Stamina
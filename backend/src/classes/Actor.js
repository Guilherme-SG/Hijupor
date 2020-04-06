const { createId } = require("../util")
const Stats = require("./Stats")

class Actor {
    constructor({
        stats = new Stats(), 
        id = createId(),        
        name = `Nameless#${id}`,
        partyId = -1,
        currentStamina = 0,
        totalStamina = 0,
        totalHP,
        currentHP,
        skills = []
    }) {
        this.id = id
        this.partyId = partyId
        this.temporaryPartyId = -1
        
        this.name = name
        this.stats = stats

        this.status = []

        if(totalHP) {
            this.currentHP = currentHP
            this.totalHP = totalHP
        } else {
            this.calculateTotalHPByStats()
            this.regenateHPFully()
        }
        

        this.currentStamina = currentStamina
        this.totalStamina = totalStamina

        this.skills = skills
    }

    setParty(partyId) {
        this.partyId = partyId
    }

    setTemporaryParty(partyId) {
        this.temporaryPartyId = partyId
    }

    regenateHPFully() {
        this.currentHP = this.totalHP
    }

    calculateTotalHPByStats() {
        this.totalHP = 100 + this.stats.vit * 5
    }

    getPercentualHP() {
        return this.currentHP / this.totalHP
    }

    getPercentualShield() {
        return this.currentStamina / this.totalStamina
    }

    healHP(heal, turnExtraHPToStamina) {
        if (this.isHealingGreaterThanTotalHP(heal)) {
            if (turnExtraHPToStamina) {
                this.healShield(heal - this.totalHP + this.currentHP)
            }

            this.currentHP = this.totalHP
        } else {
            this.currentHP += heal
        }
    }

    canDieByDamage = damage => damage >= this.currentHP

    isHealingGreaterThanTotalHP = heal => heal + this.currentHP > this.totalHP

    healShield(heal) {
        this.currentStamina += heal

        if (this.isCurrentStaminaGreaterThanTotal()) {
            this.totalStamina = this.currentStamina
        }
    }

    isCurrentStaminaGreaterThanTotal = () => this.currentStamina > this.totalStamina

    takeDamage(damage) {
        let prevHP = this.currentHP
        let prevStamina = this.currentStamina
        let remainingDamage = 0

        if (this.haveShield()) {
            if (this.shieldCanBeBroken(damage)) {
                this.currentHP -= damage - this.currentStamina
                this.breakShield()
                remainingDamage = damage - prevStamina - prevHP
            } else {
                this.damageShield(damage)
                remainingDamage = damage - this.prevStamina
            }
        } else {
            this.currentHP -= damage
            remainingDamage = damage - prevHP
        }

        if (!this.isAlive()) this.die()

        return remainingDamage < 0 ? 0 : remainingDamage
    }

    damageShield(damage) {
        this.currentStamina -= damage
    }

    breakShield() {
        this.currentStamina = 0
        this.totalStamina = 0
    }

    haveShield = () => this.currentStamina > 0
    shieldCanBeBroken = (damageAmount) => damageAmount > this.currentStamina

    isAlive = () => this.currentHP > 0

    die() {
        this.currentHP = 0
        this.cleanStatusList()
        this.addStatus("dead")
    }

    addTemporaryAlly(ally) {
        ally.setTemporaryParty(this.partyId)
        this.allies[ally.id] = ally
    }

    removeTemporaryAlly(id) {
        ally.setTemporaryParty(-1)
        delete this.allies[id]
    }

    addSkill(skillId) {
        this.skills.push(skillId)
    }

    addStatus(status) {
        this.status.push(status)
    }

    cleanStatusList() {
        this.status = []
    }
}

module.exports = Actor
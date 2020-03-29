const { createId } = require("../util")
const Stats = require("./Stats")

class Unit {
    constructor(name, stats = new Stats(), id = createId()) {
        this.id = id
        this.partyId = -1
        this.temporaryPartyId = -1

        this.allies = {}

        this.name = name ? name : `Nameless#${id}`
        this.stats = stats

        this.currentHP = 0
        this.totalHP = 100

        this.currentStamina = 0
        this.totalStamina = 0

        this.skills = []
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
        this.totalHP = 100 + Math.floor(this.stats.vit / 5)
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
}

module.exports = Unit
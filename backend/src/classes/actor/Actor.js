const { createId } = require("../../util")
const Stats = require("./Stats")
const Serializable = require("../Serializable")
const StaminaShield = require("./StaminaShield")
const ActionPoint = require("./ActionPoint")

class Actor extends Serializable {
    constructor({
        stats = new Stats({}), 
        id = createId(),        
        name = `Nameless#${id}`,
        partyId = -1,
        currentStamina = 0,
        totalStamina = 0,
        totalHP,
        currentHP,
        status = [],
        skills = []
    }) {
        super()
        
        this.id = id
        this.partyId = partyId
        
        this.name = name
        this.stats = stats

        this.status = status

        if(totalHP) {
            this.currentHP = currentHP
            this.totalHP = totalHP
        } else {
            this.calculateTotalHPByStats()
            this.regenateHPFully()
        }

        this.currentStamina = currentStamina
        this.totalStamina = totalStamina

        this.staminaShield = new StaminaShield(this)
        this.actionPoint = new ActionPoint(this.stats.agi)

        this.skills = skills

        this.statusNegativeimmunity = false
        this.debuffimmunity = false
    }

    serialize() {
        return {
            id: this.id,
            name: this.name,
            stats: this.stats.serialize(),
            partyId: this.partyId,
            currentHP: this.currentHP,
            totalHP: this.totalHP,
            currentStamina: this.currentStamina,
            totalStamina: this.totalStamina,
            status: this.status,
            skills: this.skills
        }
    }

    update() {
        this.stats.update()
        this.staminaShield.updateFromOwner()
        this.actionPoint.update()
    }

    setParty(partyId) {
        this.partyId = partyId
    }

    regenateHPFully() {
        this.currentHP = this.totalHP
    }

    calculateTotalHPByStats() {
        this.totalHP = 100 + this.stats.get("vit") * 5
    }

    getPercentualHP() {
        return this.currentHP / this.totalHP
    }

    getPercentualShield() {
        return this.currentStamina / this.totalStamina
    }

    healHP(heal, turnExtraHPToStamina) {
        this.staminaShield.updateToOwner()

        if (this.isHealingGreaterThanTotalHP(heal)) {
            if (turnExtraHPToStamina) {
                this.staminaShield.heal(heal - this.totalHP + this.currentHP)
            }

            this.currentHP = this.totalHP
        } else {
            this.currentHP += heal
        }

        this.staminaShield.updateFromOwner()
    }

    canDieByDamage = damage => damage >= this.currentHP

    isHealingGreaterThanTotalHP = heal => heal + this.currentHP > this.totalHP

    isCurrentStaminaGreaterThanTotal = () => this.currentStamina > this.totalStamina

    takeDamage(damage, type, attacker) {
        let prevHP = this.currentHP
        let prevStamina = this.currentStamina
        let remainingDamage = damage

        this.staminaShield.updateFromOwner()

        if (this.staminaShield.isNotBroken()) {
            if (this.staminaShield.canBeBroken(damage)) {
                this.currentHP -= this.staminaShield.takeDamage(damage)
                remainingDamage = damage - prevStamina - prevHP
            } else {
                this.staminaShield.takeDamage(damage)
                remainingDamage = 0
            }
        } else {
            this.currentHP -= damage
            remainingDamage = damage - prevHP
        }

        if (this.isDead()) this.die()

        this.staminaShield.updateFromOwner()

        return remainingDamage < 0 ? 0 : remainingDamage
    }

    haveShield = () => this.staminaShield.isNotBroken()

    isAlive = () => this.currentHP > 0
    isDead = () => !this.isAlive()

    die() {
        this.currentHP = 0
        this.cleanStatusList()
        this.addStatus("dead")
    }

    addSkill(skillId) {
        this.skills.push(skillId)
    }

    addStatus(status) {
        if(!this.haveImmunityToNegativeStatus()) {
            this.status.push(status)
            return true
        }
        
        return false
    }

    cleanStatusList() {
        this.status = []
    }

    haveImmunityToNegativeStatus() {
        return this.statusNegativeimmunity
    }

    addImmunityToNegativeStatus() {
        this.statusNegativeimmunity = true
    }

    removeImmunityToNegativeStatus() {
        this.statusNegativeimmunity = false
    }

    haveImmunityToDebuff() {
        return this.debuffimmunity
    }

    addImmunityToDebuff() {
        this.debuffimmunity = true
    }

    removeImmunityToDebuff() {
        this.debuffimmunity = false
    }
}

module.exports = Actor
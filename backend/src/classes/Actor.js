const { createId } = require("../util")
const Stats = require("./Stats")
const Serializable = require("./Serializable")


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

        this.skills = skills
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
        this.status.push(status)
    }

    cleanStatusList() {
        this.status = []
    }
}

module.exports = Actor
const { createId } = require("../../util")
const Stamina = require("./Stamina")
const ActionPoint = require("./ActionPoint")
const Health = require("./Health")
const Stats = require("./Stats")

class BaseActor {
    constructor({
        stats = new Stats({}), 
        id = createId(),        
        name = `Nameless#${id}`,
        partyId = -1,
        status = [],
        skills = []
    }) {
        this.id = id
        this.partyId = partyId
        
        this.name = name
        this.stats = stats

        this.status = status

        this.health = new Health(this.stats.vit)
        this.stamina = new Stamina(this.stats.res)
        this.actionPoint = new ActionPoint(this.stats.agi)

        this.skills = skills

        this.statusNegativeimmunity = false
        this.debuffimmunity = false

        this.regenerationList = []
    }

    serialize() {
        return {
            id: this.id,
            name: this.name,
            stats: this.stats.serialize(),
            partyId: this.partyId,
            currentHP: this.health.getAvailable(),
            totalHP: this.health.getTotal(),
            currentStamina: this.stamina.getAvailable(),
            totalStamina: this.stamina.getTotal(),
            status: this.status,
            skills: this.skills
        }
    }

    update() {
        this.stats.update()
        this.health.update()
        this.stamina.update()
        this.actionPoint.update()

        this.regenerationList
            .forEach( regen => regen.update())
    }

    setParty(partyId) {
        this.partyId = partyId
    }

    // Action Point

    getNecessaryToBeFullAP() {
        return this.actionPoint.getNecessaryToBeFull()
    }

    getAvailableAP() {
        return this.actionPoint.getAvailable()
    }

    getTotalAP() {
        return this.actionPoint.getTotal()
    }

    getPercentualAP() {
        return this.actionPoint.getPercentual()
    }

    // Health

    getNecessaryToBeFullHP() {
        return this.health.getNecessaryToBeFull()
    }

    getAvailableHP() {
        return this.health.getAvailable()
    }

    getTotalHP() {
        return this.health.getTotal()
    }

    getPercentualHP() {
        return this.health.getPercentual()
    }

    // Stamina

    getNecessaryToBeFullStamina() {
        return this.stamina.getNecessaryToBeFull()
    }

    getAvailableStamina() {
        return this.stamina.getAvailable()
    }

    getTotalStamina() {
        return this.stamina.getTotal()
    }

    getPercentualStamina() {
        return this.stamina.getPercentual()
    }

    healWithShield(healAmount) {
        if(healAmount > this.health.getNecessaryToBeFull()) {
            this.stamina.heal(healAmount - this.health.getNecessaryToBeFull())
            this.heal(this.health.getNecessaryToBeFull())
        } else {
            this.heal(healAmount)
        }        
    }

    heal(healAmount) {
        this.health.heal(healAmount)
    }

    canDieByDamage = damage => damage >= this.health.getAvailable()

    takeDamage(damage) {
        let remainingDamage

        if (this.stamina.isNotBroken()) {
            if (this.stamina.canBeBroken(damage)) {
                remainingDamage = this.stamina.takeDamage(damage)
                remainingDamage = this.health.takeDamage(remainingDamage)
            } else {
                this.stamina.takeDamage(damage)
                remainingDamage = 0
            }
        } else {
            remainingDamage = this.health.takeDamage(damage)
        }

        if (this.isDead()) this.die()

        return remainingDamage < 0 ? 0 : remainingDamage
    }

    haveShield = () => this.stamina.isNotBroken()

    isAlive() {
        return !this.isDead()
    }
    
    isDead() {
        return this.status.includes("dead") 
            || this.health.getAvailable() == 0
    }

    die() {
        this.cleanStatusList()
        this.addStatus("dead")
    }

    addSkill(skillId) {
        this.skills.push(skillId)
    }

    addStatus(status) {
        if(this.haveImmunityToNegativeStatus()) {
            return false
        }
        
        this.status.push(status)
        return true
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

    addRegeneration(regen) {        
        regen.setTarget(this)
        this.regenerationList.push(regen)
    }

    removeRegeneration(regeneration) {
        this.regenerationList = this.regenerationList
            .filter( regen => regen != regeneration)
    }
}

module.exports = BaseActor
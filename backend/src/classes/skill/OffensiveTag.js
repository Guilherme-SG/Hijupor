const SkillTag = require("./SkillTag")
const Party = require("../Party")

class OffensiveTag extends SkillTag {
    constructor(evaluator, conditionalInterpreter, filter) {
        super(evaluator, conditionalInterpreter, filter)
    }
    
    active(caster, skill) {
        const { 
            damageFunction,
            extraDamageHitAnotherTarget,
            damageBonus,
            subject
        } = skill.tags.offensive;       
        
        let target = this.evaluator.evaluateTarget(subject);

        let damageAmount = this.calculateDamage(damageFunction, caster, skill, target)
        if(damageBonus) damageAmount = this.applyBonus(damageBonus, damageAmount)

        skill.damageDone = damageAmount

        if (target instanceof Party) {
            this.dealSameDamageToParty(damageAmount, target)
        }
        else {
            damageAmount = target.takeDamage(damageAmount)

            if(extraDamageHitAnotherTarget && damageAmount > 0) {
                let targetsParty = this.evaluator.getActorsParty(target)

                damageAmount = this.distributeDamageToParty(damageAmount, targetsParty)
            }            
        }
    }

    calculateDamage(damageFunction, caster, skill, target) {
        return this.getCalculationFunction(damageFunction)({ caster, skill, target, tag: "offensive" });
    }

    applyBonus(damageBonus, damageAmount) {
        damageBonus.forEach(bonus => {
            if (bonus.triggers 
                && !this.conditionalInterpreter.processMany(bonus.triggers)) return
                
            damageAmount *= 1 + bonus.multipler;
        });

        return damageAmount;
    }

    distributeDamageToParty(damageAmount, party) {
        for (let target of party.getAll().filter( member => member.isAlive() )) {
            damageAmount = target.takeDamage(damageAmount);
            
            if (!damageAmount)
                break;
        }

        return damageAmount
    }

    dealSameDamageToParty(damageAmount, party) {
        const members = party.getAll()
        let lastDamageTaked  = 0

        members.forEach(target => {
            lastDamageTaked = target.takeDamage(damageAmount);
        });

        return lastDamageTaked
    }

}

module.exports = OffensiveTag;

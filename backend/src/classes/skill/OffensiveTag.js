const Party = require("../Party");
const { SkillTag } = require("./SkillTag");

const gameSystem = require("../GameSystem")

class OffensiveTag extends SkillTag {
    constructor() {
        super();
    }
    
    active(caster, skill) {
        const { 
            damageFunction,
            extraDamageHitAnotherEnemy,
            damageBonus,
            target
        } = skill.tags.offensive;       
        
        let subject = this.evaluateTarget(target);

        let damageAmount = this.calculateDamage(damageFunction, caster, skill, target)
        damageAmount = this.applyBonus(damageBonus, damageAmount)

        console.log(`${caster.name} is casting ${skill.name} on ${subject.name}`);

        if (subject instanceof Party) {
            this.attackParty(damageAmount, subject, caster, extraDamageHitAnotherEnemy)
        }
        else {
            console.log(`${caster.name} deals ${damageAmount} damage to ${target.name}`);
            subject.takeDamage(damageAmount);
        }
        skill.tags.offensive.damage = damageAmount;
    }

    

    calculateDamage(damageFunction, caster, skill, target) {
        return this.getCalculationFunction(damageFunction)({ caster, skill, target, tag: "offensive" });
    }

    applyBonus(damageBonus, damageAmount) {
        if (damageBonus) {
            console.log("Before bonus", damageAmount);
            damageBonus.forEach(bonus => {
                if (bonus.trigger && !this.conditionalSystem.trigger(bonus.trigger))
                    return;
                    
                damageAmount *= 1 + bonus.multipler;
            });
            console.log("After Bonus", damageAmount);
        }

        return damageAmount;
    }

    attackParty(damageAmount, party, attacker, extraDamageHitAnotherEnemy) {
        if (extraDamageHitAnotherEnemy) {
            this.distributeDamageToParty(damageAmount, party, attacker)                
        }
        else {
            this.dealSameDamageToParty(damageAmount, party, attacker)
        }
    }

    distributeDamageToParty(damageAmount, party, attacker) {
        const members = party.getMembers()

        for (let target of members) {
            console.log(`${attacker.name} deals ${damageAmount} damage to ${target.name}`);
            damageAmount = target.takeDamage(damageAmount);
            
            if (!damageAmount)
                break;
        }
    }

    dealSameDamageToParty(damageAmount, party, attacker) {
        const members = party.getMembers()

        members.forEach(target => {
            console.log(`${attacker.name} deals ${damageAmount} damage to ${target.name}`);
            target.takeDamage(damageAmount);
        });
    }
}
exports.OffensiveTag = OffensiveTag;

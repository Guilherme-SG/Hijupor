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
            subject
        } = skill.tags.offensive;       
        
        let target = this.evaluateTarget(subject);

        let damageAmount = this.calculateDamage(damageFunction, caster, skill, target)
        if(damageBonus) damageAmount = this.applyBonus(damageBonus, damageAmount)

        if (subject instanceof Party) {
            this.attackParty(damageAmount, subject, caster, extraDamageHitAnotherEnemy)
        }
        else {
            console.log(`${caster.name} deals ${damageAmount} damage to ${target.name}`);
            damageAmount = target.takeDamage(damageAmount);

            if(extraDamageHitAnotherEnemy && damageAmount > 0) {
                const targetParty = gameSystem.getParty(target.id)
                let members = targetParty.getMembers().filter( member => member.id != subject.id)

                this.attackParty(damageAmount, members, caster, extraDamageHitAnotherEnemy)
            }
            
        }
        skill.tags.offensive.damage = damageAmount;
    }

    

    calculateDamage(damageFunction, caster, skill, target) {
        return this.getCalculationFunction(damageFunction)({ caster, skill, target, tag: "offensive" });
    }

    applyBonus(damageBonus, damageAmount) {
        damageBonus.forEach(bonus => {
            if (bonus.trigger 
                && !this.conditionalSystem.trigger(bonus.trigger)) return
                
            damageAmount *= 1 + bonus.multipler;
        });

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

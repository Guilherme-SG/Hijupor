const Party = require("../Party");
const { SkillTag } = require("./SkillTag");

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

        // Deal the damage
        if (subject instanceof Party) {
            const members = subject.getMembers();
            if (extraDamageHitAnotherEnemy) {
                for (let subject of members) {
                    console.log(`${caster.name} deals ${damageAmount} damage to ${subject.name}`);
                    damageAmount = target.takeDamage(damageAmount);
                    
                    if (!damageAmount)
                        break;
                }
            }
            else {
                members.forEach(target => {
                    console.log(`${caster.name} deals ${damageAmount} damage to ${target.name}`);
                    target.takeDamage(damageAmount);
                });
            }
        }
        else {
            console.log(`${caster.name} deals ${damageAmount} damage to ${target.name}`);
            subject.takeDamage(damageAmount);
        }
        skill.tags.offensive.damage = damageAmount;
    }

    evaluateTarget(target) {
        if (typeof target == "string") {
            target = eval(target);
        }
        return target;
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
}
exports.OffensiveTag = OffensiveTag;

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

        skill.tags.offensive.damage = damageAmount

        if (Array.isArray(target)) {
            this.attackParty(damageAmount, target, caster, extraDamageHitAnotherEnemy)
        }
        else {
            console.log(`${caster.name} deals ${damageAmount} damage to ${target.name}`);
            damageAmount = target.takeDamage(damageAmount);

            if(extraDamageHitAnotherEnemy && damageAmount > 0) {
                let members = this.getOthersMembersInSameParty(target)
                damageAmount = this.attackParty(damageAmount, members, caster, extraDamageHitAnotherEnemy)
            }            
        }
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
            return this.distributeDamageToParty(damageAmount, party, attacker)                
        }
        else {
            return this.dealSameDamageToParty(damageAmount, party, attacker)
        }
    }

    distributeDamageToParty(damageAmount, party, attacker) {
        for (let target of party) {
            console.log(`${attacker.name} deals ${damageAmount} damage to ${target.name}`);
            damageAmount = target.takeDamage(damageAmount);
            
            if (!damageAmount)
                break;
        }

        return damageAmount
    }

    dealSameDamageToParty(damageAmount, party, attacker) {
        const members = party.getMembers()
        let lastDamageTaked  = 0

        members.forEach(target => {
            console.log(`${attacker.name} deals ${damageAmount} damage to ${target.name}`);
            lastDamageTaked = target.takeDamage(damageAmount);
        });

        return lastDamageTaked
    }

    getOthersMembersInSameParty(actorReference) {
        const actorParty = gameSystem.getParty(actorReference.partyId)
        gameSystem.setSelectedParty(actorParty.id)

        return this.evaluateTarget({
            type: "party",
            filter: [                
                {
                    fn: "isNotEqual",
                    params: {
                        attribute: "id",
                        reference: actorParty.id
                    }
                },
                {
                    fn: "isEqual",
                    params: {
                        attribute: "isAlive",
                        reference: true
                    }
                }          
            ]
        })
    }
}
exports.OffensiveTag = OffensiveTag;

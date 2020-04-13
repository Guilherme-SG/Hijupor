const SkillTag = require("./SkillTag")
const Party = require("../Party")

class HealingTag extends SkillTag {
    constructor(evaluator, conditionalInterpreter, filter) {
        super(evaluator, conditionalInterpreter, filter);
    }
    /*  Recuperam a vida, podendo exceder a vida do alvo em forma de escudo
        Healing options:
        Vida excedente vira escudo: bool
        [1]' Forma de recuperação: fixo ou percentual
        [1] -> Se fixo, como o calculo é feito: fixo direto ou formula
        [1] -> Se percentual, qual é a referencia do percentual: stat ou dano causado pela skill ou hp ou stamina
        do actor referencial
    */
    active(caster, skill) {
        const { 
            turnExtraHPToStamina,
            healFunction,
            subject
        } = skill.tags.healing;
        
        let target = this.evaluator.evaluateTarget(subject)
        let healAmount = this.calculateHeal(healFunction, caster, skill, target)        

        if (target instanceof Party) {
            if(turnExtraHPToStamina) {
                this.healPartyWithShield(target, healAmount)
            } else {
                this.healParty(target, healAmount)
            }
        }
        else {
            if(turnExtraHPToStamina) {
                this.healActorWithShield(target, healAmount)
            } else {
                this.healActor(target, healAmount)
            }
        }
    }

    calculateHeal(functionName, caster, skill, target) {
        let healFunction = this.getCalculationFunction(functionName)
        return healFunction({ caster, skill, target, tag: "healing" })
    }

    healPartyWithShield(party, healAmount) {
        let members = party.getAll()
        members.forEach(target => this.healActorWithShield(target, healAmount))
    }

    healActorWithShield(actor, healAmount) {
        actor.healWithShield(healAmount)
    }

    healParty(party, healAmount) {
        let members = party.getAll()
        members.forEach(target => this.healActor(target, healAmount))
    }

    healActor(actor, healAmount) {
        actor.heal(healAmount)
    }
    
}

module.exports = HealingTag;

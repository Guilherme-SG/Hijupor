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
            this.healParty(target, healAmount, turnExtraHPToStamina)
        }
        else {
            this.healActor(target, healAmount, turnExtraHPToStamina)
        }
    }

    calculateHeal(functionName, caster, skill, target) {
        let healFunction = this.getCalculationFunction(functionName)
        return healFunction({ caster, skill, target, tag: "healing" })
    }

    healActor(actor, healAmount, turnExtraHPToStamina) {
        actor.healHP(healAmount, turnExtraHPToStamina)
    }

    healParty(party, healAmount, turnExtraHPToStamina) {
        let members = party.getAll()
        members.forEach(target => this.healActor(target, healAmount, turnExtraHPToStamina))
    }
}

module.exports = HealingTag;

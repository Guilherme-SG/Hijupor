const Party = require("../Party");
const { SkillTag } = require("./SkillTag");

class HealingTag extends SkillTag {
    constructor() {
        super();
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
        
        let target = this.evaluateTarget(subject)
        let healAmount = this.calculateHeal(healFunction, caster, skill, target)
       
        if (Array.isArray(target)) {
            target.forEach(target => this.healActor(target, healAmount, turnExtraHPToStamina))
        }
        else {
            this.healActor(target, healAmount, turnExtraHPToStamina)
            console.log(`${caster.name} heals ${healAmount} HP of ${target.name}`)
        }
    }

    calculateHeal(healFunction, caster, skill, target) {
        return this.getCalculationFunction(healFunction)({ caster, skill, target, tag: "healing" })
    }

    healActor(actor, healAmount, turnExtraHPToStamina) {
        actor.healHP(healAmount, turnExtraHPToStamina)
    }
}

exports.HealingTag = HealingTag;

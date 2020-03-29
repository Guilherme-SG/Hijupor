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
        const { turnExtraHPToStamina, healFunction } = skill.tags.healing;
        let { target } = skill.tags.healing;
        const healSingleTarget = (caster, skill, target) => {
            healAmount = this.getCalculationFunction(healFunction)({ caster, skill, target, tag: "healing" });
            target.healHP(healAmount, turnExtraHPToStamina);
            console.log(`${caster.name} heals ${healAmount} HP of ${target.name}`);
        };
        if (typeof target == "string") {
            target = eval(target);
        }
        let healAmount;
        if (target instanceof Party) {
            target.getMembers().forEach(target => healSingleTarget(caster, skill, target));
        }
        else {
            healSingleTarget(caster, skill, target);
        }
    }
}
exports.HealingTag = HealingTag;

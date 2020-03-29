const ConditionalSystem = require("../ConditionalSystem");
const gameSystem = require("../GameSystem")

class SkillTag {
    constructor() {
        this.conditionalSystem = new ConditionalSystem();
    }
    
    getCalculationFunction(nameFunction) {
        const functions = {
            byFixedValue: ({ skill }) => skill.tags.healing.fixedValue,
            byFormula: ({ caster, skill, target, tag }) => eval(skill.tags[tag].formula),
            byPercentualOf: ({ caster, skill, target, tag }) => {
                let { reference, percentual } = skill.tags[tag];
                return percentual * eval(reference);
            }
        };
        return functions[nameFunction];
    }

    evaluateTarget(target) {
        gameSystem.setSelectedActor(target.id)
        gameSystem.setSelectedParty(target.id)
        return target
    }

    active(caster, skill) { }
}

exports.SkillTag = SkillTag
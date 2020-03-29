const ConditionalSystem = require("../ConditionalSystem");

class SkillTag {
    constructor() {
        this.conditionalSystem = new ConditionalSystem();
    }
    getCalculationFunction(nameFunction) {
        const functions = {
            byFixedValue: ({ skill }) => skill.tags.healing.fixedValue,
            byFormula: ({ caster, skill, target, tag }) => eval(skill.tags[tag].formula),
            byPercentualOf: ({ caster, skill, target }) => {
                let { reference, percentual } = skill.tags.healing;
                return percentual * eval(reference);
            }
        };
        return functions[nameFunction];
    }
    active(caster, skill) { }
}

exports.SkillTag = SkillTag
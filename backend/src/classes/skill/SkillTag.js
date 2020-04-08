class SkillTag {
    constructor(evaluator, conditionalInterpreter, filter) {
        this.evaluator = evaluator
        this.conditionalInterpreter = conditionalInterpreter
        this.filter = filter
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
    
    active(caster, skill) { 
        throw new Error("Not Implemented")
    }
}

exports.SkillTag = SkillTag
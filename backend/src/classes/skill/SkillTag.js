class SkillTag {
    constructor(evaluator, conditionalInterpreter, filter) {
        this.evaluator = evaluator
        this.conditionalInterpreter = conditionalInterpreter
        this.filter = filter
    }
    
    getCalculationFunction(nameFunction) {
        const functions = {
            byRawValue: ({ skill, tag }) => skill.tags[tag].rawValue,
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

module.exports = SkillTag
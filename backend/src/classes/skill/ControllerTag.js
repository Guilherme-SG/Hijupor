const SkillTag = require("./SkillTag")

class ControllerTag extends SkillTag {
    constructor(evaluator, conditionalInterpreter, filter) {
        super(evaluator, conditionalInterpreter, filter)
    }   

    active(caster, skill) {
        const {
            
        } = skill.tags.controller
    }
}

module.exports = ControllerTag;

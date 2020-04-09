const SkillTag = require("./SkillTag")

class DisruptiveTag extends SkillTag {
    constructor(evaluator, conditionalInterpreter, filter) {
        super(evaluator, conditionalInterpreter, filter)
    }

    // Infligem status negativos ao alvo
    active(caster, skill) {
        const {
            subject,
            statusList,
        } = skill.tags.disruptive

        let target = this.evaluator.evaluateTarget(subject)

        statusList.forEach( status => {
            let { triggers, name } = status
            
            if(triggers && !this.conditionalInterpreter.processMany(triggers)) return

            target.addStatus(name)
        })

        
    }
}

module.exports = DisruptiveTag;

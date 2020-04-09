const SkillTag = require("./SkillTag")
const Party = require("../Party")

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
        
        if(target instanceof Party) {
            this.processStatusListToParty(statusList, target)
        } else {
            this.processStatusListToActor(statusList, target)
        }
    }

    processStatusListToParty(statusList, party) {
        party.getAll()
            .forEach( actor => this.processStatusListToActor(statusList, actor))
    }

    processStatusListToActor(statusList, actor) {
        statusList.forEach( status => {
            let { triggers, name } = status
            
            if(triggers) {
                let result = this.conditionalInterpreter.processMany(triggers)

                if(!result) return
            }

            actor.addStatus(name)
        })
    }
}

module.exports = DisruptiveTag;

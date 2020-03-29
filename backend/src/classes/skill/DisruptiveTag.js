const { SkillTag } = require("./SkillTag");

const gameSystem = require("../GameSystem")

class DisruptiveTag extends SkillTag {
    constructor() {
        super();
    }
    // Infligem status negativos ao alvo
    active(caster, skill) {
        const {
            statusList,
        } = skill.tags.disruptive

        let target = gameSystem.getSelectedActor()

        statusList.forEach( status => {
            let { triggers } = status
            if(triggers && triggers.every( trigger => 
                !this.conditionalSystem.trigger(trigger) )) {
                return
            }
        
            target.addStatus(status.name)    
        })

        
    }
}
exports.DisruptiveTag = DisruptiveTag;

const { SkillTag } = require("./SkillTag");
const Party = require("../Party")
const gameSystem = require("../SkillManager")

class ControllerTag extends SkillTag {
    constructor() {
        super();
    }    

    active(caster, skill) {
        const {
            subject, 
            filters,
            triggers
        } = skill.tags.controller

        if(triggers && triggers.every( trigger => 
            !this.conditionalSystem.trigger(trigger) )) {
            return
        }

        let target = subject.getMembers()

        if(filters && subject instanceof Party) {
            filters.forEach( filter => {
                target = target.filter( member => 
                    this.conditionalSystem.filter({
                        ...filter,
                        target: member
                    })
                )
            })
        }

        target.forEach( member => {
            caster.addTemporaryAlly(member)
        })
    }
}
exports.ControllerTag = ControllerTag;

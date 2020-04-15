const SkillTag = require("./SkillTag")
const Party = require("../Party")

const Regeneration = require("./Regeneration")

class RegenerationTag extends SkillTag {
    constructor(evaluator, conditionalInterpreter, filter) {
        super(evaluator, conditionalInterpreter, filter)
    }

    // Regeneram as forças do alvo ao longo do tempo
    active(caster, skill) {
        const {
            subject,
            regenerationFunction,
            duration
        } = skill.tags.regeneration
        

        let target = this.evaluator.evaluateTarget(subject)
        let percentage = this.calculateRegenaration(regenerationFunction, caster, skill, target) 
                
        if(target instanceof Party) {
            this.regenerateParty(target, percentage, duration)
        } else {
            this.regenarateActor(target, percentage, duration)
        }
        
    }

    calculateRegenaration(fn, caster, skill, target) {
        return this.getCalculationFunction(fn)({ caster, skill, target, tag: "regeneration" });
    }

    regenerateParty(party, percentage, duration) {
        party.getAll()
            .forEach( actor => 
                this.regenarateActor(actor, percentage, duration)
            )
    }

    regenarateActor(actor, percentage, duration) {
        actor.addRegeneration(new Regeneration(percentage, duration))
    }
}

module.exports = RegenerationTag;

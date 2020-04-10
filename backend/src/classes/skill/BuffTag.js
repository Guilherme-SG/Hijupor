const SkillTag = require("./SkillTag")
const Party = require("../Party")
const FinalBonus = require("../FinalBonus")

class BuffTag extends SkillTag {
    constructor(evaluator, conditionalInterpreter, filter) {
        super(evaluator, conditionalInterpreter, filter)
    }

    // Previnem, diminuem, reflerem ou anulam ataques/magias
    active(caster, skill) {
        const {
            subject,
            buffFunction,
            duration,
            statToImprove
        } = skill.tags.buff

        let target = this.evaluator.evaluateTarget(subject)
        let improvement = this.calculateImprovement(buffFunction, caster, skill, target)

        if(target instanceof Party) {
            this.improveParty(target, improvement, statToImprove, duration)
        } else {
            this.improveActor(target, improvement, statToImprove, duration)
        }
    }

    calculateImprovement(fn, caster, skill, target) {
        return this.getCalculationFunction(fn)({ caster, skill, target, tag: "buff" });
    }

    improveParty(party, improvement, statToImprove, duration) {
        party.getAll()
            .forEach( actor => this.improveActor(actor, improvement, statToImprove, duration))
    }

    improveActor(actor, improvement, statToImprove, duration) {
        actor.stats[statToImprove].addFinalBonus(new FinalBonus(0, improvement, duration))
    }
}
module.exports = BuffTag;

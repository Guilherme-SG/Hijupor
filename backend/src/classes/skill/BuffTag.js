const SkillTag = require("./SkillTag")
const Party = require("../Party")

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
            this.improveParty(target, improvement, statToImprove)
        } else {
            this.improveActor(target, improvement, statToImprove)
        }
    }

    calculateImprovement(damageFunction, caster, skill, target) {
        return this.getCalculationFunction(damageFunction)({ caster, skill, target, tag: "buff" });
    }

    improveParty(party, improvement, statToImprove) {
        party.getAll()
            .forEach( actor => this.improveActor(actor, improvement, statToImprove))
    }

    improveActor(actor, improvement, statToImprove) {
        actor.stats.modifyStatByMultiplier(statToImprove, improvement)
    }
}
module.exports = BuffTag;

const SkillTag = require("./SkillTag")
const Party = require("../Party")
const FinalBonus = require("../attribute/FinalBonus")

class BuffTag extends SkillTag {
    constructor(evaluator, conditionalInterpreter, filter) {
        super(evaluator, conditionalInterpreter, filter)
    }

    active(caster, skill) {
        const {
            subject,
            buffFunction,
            duration,
            params
        } = skill.tags.buff

        let target = this.evaluator.evaluateTarget(subject)
        let improvement = this.calculateImprovement(buffFunction, caster, skill, target)

        if(target instanceof Party) {
            this.improveParty(target, improvement, params, duration)
        } else {
            this.improveActor(target, improvement, params, duration)
        }
    }

    calculateImprovement(fn, caster, skill, target) {
        return this.getCalculationFunction(fn)({ caster, skill, target, tag: "buff" });
    }

    improveParty(party, improvement, params, duration) {
        party.getAll()
            .forEach( actor => this.improveActor(actor, improvement, params, duration))
    }

    improveActor(actor, improvement, params, duration) {
        const { actionPoint, stats, skills } = params

        if(actionPoint) {
            this.improveActorAP(actor, improvement, duration)
        }

        if(stats) {
            this.improveActorStats(actor, improvement, stats, duration)
        }

        if(skills) {
            this.improveActorSkills(actor, improvement, skills, duration)
        }
    }

    improveActorAP(actor, improvement, duration) {
        actor.actionPoint.addExtraPoint(improvement, duration)
    }

    improveActorStats(actor, improvement, stats, duration) {        
        Object.keys(stats)
            .forEach( stat => 
                actor.stats[stat].addFinalBonus( new FinalBonus(0, improvement, duration) ) 
            )
    }

    improveActorSkills(actor, improvement, params, duration) {
        const { cooldownReduction } = params
        
        actor.skills.forEach( skill => {
            if( cooldownReduction ) skill.update()
        })
    }
}
module.exports = BuffTag;

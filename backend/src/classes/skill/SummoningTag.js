const SkillTag = require("./SkillTag")
const Summon = require("../actor/Summon")

class SummoningTag extends SkillTag {
    constructor(evaluator, conditionalInterpreter, filter) {
        super(evaluator, conditionalInterpreter, filter)
    }

    // Evocam entidades para auxiliar o caster
    active(caster, skill) {
        const {
            create,
            duration,
            quantityBy,
        } = skill.tags.summoning

        const creations = {
            clone: (actor, duration) => {
                return this.cloneActorAsSummon(actor, duration)
            },
            familiar: (caster, duration, {statsPercentage}) => {
                return new Summon({
                    ...caster,
                    name: undefined,
                    id: undefined,
                    duration,
                    statsPercentage
                })
            }
        }
        
        let quantity = this.calculateSummonsToInvoke(quantityBy, caster, skill)
        let summon = creations[create.type](caster, duration, create.params)

        for(let i = 0; i < quantity; i++) {
            caster.addSummon(summon)
        }
    }

    cloneActorAsSummon(actor, duration) {
        return new Summon({
            ...actor,
            name: undefined,
            id: undefined,
            duration
        })
    }

    calculateSummonsToInvoke(fn, caster, skill, target) {
        return this.getCalculationFunction(fn)({ caster, skill, target, tag: "summoning" });
    }
}

module.exports = SummoningTag;

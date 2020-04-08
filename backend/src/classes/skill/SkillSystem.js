const { SummoningTag } = require("./SummoningTag")
const { DebuffTag } = require("./DebuffTag")
const { BuffTag } = require("./BuffTag")
const { DisruptiveTag } = require("./DisruptiveTag")
const { ControllerTag } = require("./ControllerTag")
const { RegenerationTag } = require("./RegenerationTag")
const { DeffensiveTag } = require("./DeffensiveTag")
const { OffensiveTag } = require("./OffensiveTag")
const { HealingTag } = require("./HealingTag")


class SkillSystem {

    constructor(evaluator, conditionalInterpreter, filter, skillManager, actorManager) {
        this.skillManager = skillManager
        this.actorManager = actorManager

        this.tags = {
            healing: new HealingTag(evaluator, conditionalInterpreter, filter),
            offensive: new OffensiveTag(evaluator, conditionalInterpreter, filter),
            deffensive: new DeffensiveTag(evaluator, conditionalInterpreter, filter),
            regenaration: new RegenerationTag(evaluator, conditionalInterpreter, filter),
            controller: new ControllerTag(evaluator, conditionalInterpreter, filter),
            disruptive: new DisruptiveTag(evaluator, conditionalInterpreter, filter),
            buff: new BuffTag(evaluator, conditionalInterpreter, filter),
            debuff: new DebuffTag(evaluator, conditionalInterpreter, filter),
            summoning: new SummoningTag(evaluator, conditionalInterpreter, filter)
        }
    }

    useSkill(casterId, skillId) {        
        const caster = this.actorManager.get(casterId)
        const skill = this.skillManager.get(skillId)
        this.actorManager.setCaster(casterId)

        console.log(`${caster.name} is casting ${skill.name}`);        
        Object.keys(skill.tags).forEach( tag => this.tags[tag].active(caster, skill) )
    }
}

module.exports = SkillSystem
const { SummoningTag } = require("./SummoningTag")
const { DebuffTag } = require("./DebuffTag")
const { BuffTag } = require("./BuffTag")
const { DisruptiveTag } = require("./DisruptiveTag")
const { ControllerTag } = require("./ControllerTag")
const { RegenerationTag } = require("./RegenerationTag")
const { DeffensiveTag } = require("./DeffensiveTag")
const { OffensiveTag } = require("./OffensiveTag")
const { HealingTag } = require("./HealingTag")

const gameSystem = require('../GameSystem')

class SkillSystem {

    constructor() {
        this.tags = {
            healing: new HealingTag(),
            offensive: new OffensiveTag(),
            deffensive: new DeffensiveTag(),
            regenaration: new RegenerationTag(),
            controller: new ControllerTag(),
            disruptive: new DisruptiveTag(),
            buff: new BuffTag(),
            debuff: new DebuffTag(),
            summoning: new SummoningTag()
        }
    }

    useSkill(casterId, skillId) {        
        const caster = gameSystem.getActor(casterId)
        const skill = gameSystem.getSkillById(skillId)
        gameSystem.setCaster(casterId)

        console.log(`${caster.name} is casting ${skill.name}`);        
        Object.keys(skill.tags).forEach( tag => this.tags[tag].active(caster, skill) )
    }
}

module.exports = SkillSystem
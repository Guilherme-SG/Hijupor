const Actor = require("../classes/actor/Actor")
const Summon = require("../classes/actor/Summon")
const Skill = require("../classes/skill/Skill")
const RawBonus = require("../classes/attribute/RawBonus")
const FinalBonus = require("../classes/attribute/FinalBonus")
const Regeneration = require("../classes/skill/Regeneration")

class ActorBuilderService {
    static build(data) {
        const actor = new Actor({})

        //data = JSON.parse(JSON.stringify(data))

        this.assign(actor, data)
        this.assignAllRecursive(actor, data)

        return data
    }

    static assignAllRecursive(source, target) {
        Object.keys(source)
            .forEach(prop => {
                if (typeof source[prop] == "object") {
                    if (Array.isArray(source[prop])) {
                        this.assignArray(target[prop], prop)
                    } else {
                        this.assign(source[prop], target[prop])
                    }

                    this.assignAllRecursive(source[prop], target[prop])
                }
            })
    }

    static assignArray(target, prop) {
        const dictionary = new Map()
        dictionary.set("skills", Skill.prototype)
        dictionary.set("summons", Summon.prototype)
        dictionary.set("rawBonuses", RawBonus.prototype)
        dictionary.set("finalBonuses", FinalBonus.prototype)
        dictionary.set("regenerationList", Regeneration.prototype)
        dictionary.set("overControl", Actor.prototype)

        if (!target || !dictionary.has(prop)) return

        target.forEach((item, index, arr) => {
            let prototype = dictionary.get(prop)
            Object.setPrototypeOf(arr[index], prototype)

            this.assignAllRecursive(Object.create(prototype), arr[index])
        })
    }

    static assign(source, target) {
        let prototype = Object.getPrototypeOf(source)
        Object.setPrototypeOf(target, prototype)
    }
}

module.exports = ActorBuilderService
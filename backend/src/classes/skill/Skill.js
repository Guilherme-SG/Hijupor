const { createId } = require("../../util")
const Attribute = require("../attribute/Attribute")
const RawBonus = require("../attribute/RawBonus")

class Skill {
    constructor(
        {
            name,
            tags = {},
            id = createId(),
            description,
            paCost = 1,
            cooldown = -1,
        }
    ) {        
        this.id = id
        this.name = name
        this.description = description
        
        this.tags = tags
        
        this.paCost = paCost
        this.cooldown = new Attribute(cooldown)

        this.init()
    }
    

    init() {
        for(let i = 0; i < this.cooldown.getBaseValue(); i++) {            
            this.cooldown.addRawBonus(new RawBonus(-1))
        }
    }

    use() {
        this.cooldown.deleteAllRawBonus()
    }

    update() {
        if(this.cooldown.getFinalValue() > 0) {
            this.cooldown.addRawBonus(new RawBonus(-1))
        }
    }

    getCooldown() {
        return this.cooldown.getFinalValue()
    }

    isAvailable() {
        return this.cooldown.getFinalValue() == 0
    }
}

module.exports = Skill
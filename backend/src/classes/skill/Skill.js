const { createId } = require("../../util")

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

        this.currentCooldown = 0
        this.cooldown = cooldown
    }
}

module.exports = Skill